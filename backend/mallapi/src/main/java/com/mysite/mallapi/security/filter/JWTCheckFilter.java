package com.mysite.mallapi.security.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.gson.Gson;
import com.mysite.mallapi.dto.MemberDTO;
import com.mysite.mallapi.util.CustomJWTException;
import com.mysite.mallapi.util.JWTUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request)
			throws ServletException {

		if (request.getMethod().equals("OPTIONS")) {
			return true;
		}

		String path = request.getRequestURI();
		log.info("체크 uri....." + path);

		// api/member/ 경로는 체크하지않음
		if (path.startsWith("/api/member/")) {
			return true;
		}
		
		// 이미지 조회 경로
		if (path.startsWith("/api/products/view/")) {
			return true;
		}

		return false;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,
	        HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {
	    log.info("----------------------JWT check FilTER----------");

	    String authHeaderStr = request.getHeader("Authorization");

	    // 토큰에서 추출할 값들
	    String email, pw, nickname;
	    Boolean social;
	    List<String> roleNames;

	    // ① 토큰 검증/파싱만 try-catch로 감쌈
	    try {
	        if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
	            throw new CustomJWTException("NoAccessToken");
	        }
	        String accessToken = authHeaderStr.substring(7);
	        Map<String, Object> claims = JWTUtil.validateToken(accessToken);

	        email = (String) claims.get("email");
	        pw = (String) claims.get("pw");
	        nickname = (String) claims.get("nickname");
	        social = (Boolean) claims.get("social");
	        roleNames = (List<String>) claims.get("roleNames");
	    } catch (Exception e) {
	        log.error("--------JWT 체크에러---------");
	        log.error(e.getMessage());

	        Gson gson = new Gson();
	        String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

	        response.setContentType("application/json");
	        response.setStatus(HttpStatus.UNAUTHORIZED.value());  // 401
	        PrintWriter printWriter = response.getWriter();
	        printWriter.println(msg);
	        printWriter.close();
	        return;   // ← 중요: 토큰 에러면 여기서 종료
	    }

	    // ② 인증 컨텍스트 설정 (try 밖에서, 예외 안 남)
	    MemberDTO memberDTO = new MemberDTO(email, pw, nickname,
	            social.booleanValue(), roleNames);

	    log.info("------------------------");
	    log.info(memberDTO);
	    log.info(memberDTO.getAuthorities());

	    UsernamePasswordAuthenticationToken authenticationToken =
	        new UsernamePasswordAuthenticationToken(memberDTO, pw, memberDTO.getAuthorities());
	    SecurityContextHolder.getContext().setAuthentication(authenticationToken);

	    // ③ filterChain.doFilter는 try 밖에서 호출
	    //    → 컨트롤러의 AccessDeniedException이 ExceptionTranslationFilter로 흘러가도록
	    filterChain.doFilter(request, response);
	}

		
	
}
