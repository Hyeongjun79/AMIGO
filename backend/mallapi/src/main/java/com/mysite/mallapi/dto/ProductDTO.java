package com.mysite.mallapi.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
	
	private Long pno;
	private Long categoryId;
	@NotEmpty(message="이름을 입력해주세요")
	private String pname;
	@NotNull(message="가격을 입력해주세요")
	private Integer price;
	private String pdesc;
	private boolean delFlag;
	
	@NotEmpty(message="이미지를 입력해주세요")
	@Builder.Default
	private List<MultipartFile> files = new ArrayList<>();
	@Builder.Default
	private List<String> uploadFileNames = new ArrayList<>();

}
