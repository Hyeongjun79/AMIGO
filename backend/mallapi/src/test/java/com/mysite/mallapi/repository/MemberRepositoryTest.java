package com.mysite.mallapi.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.mysite.mallapi.domain.Member;
import com.mysite.mallapi.domain.MemberRole;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class MemberRepositoryTest {
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Test
	public void testInsertM() {
		
		for (int i =0; i<10 ; i++) {
			Member member = Member.builder()
					.email("USER" + i + "@ibm.com")
					.pw(passwordEncoder.encode("1111"))
					.nickname("NINKNAME"+i)
					.build();
			member.addRole(MemberRole.USER);
		if(i >= 5) {
			member.addRole(MemberRole.MANAGER);
		}
		if(i >= 8) {
			member.addRole(MemberRole.ADMIN);
		}
		memberRepository.save(member);
		}
	}
	@Test
	public void testRead() {
		String email = "USER9@ibm.com";
		
		Member member = memberRepository.getWithRoles(email);
		
		log.info("-----------------");
		log.info(member);
	}

}
