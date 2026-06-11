package com.mysite.mallapi.service;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mysite.mallapi.dto.ProductDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ProductServiceTest {
	
	@Autowired
	ProductService productService;
	
	/*
	 * @Test public void testList() { PageRequestDTO pageRequestDTO =
	 * PageRequestDTO.builder().build(); PageResponseDTO<ProductDTO> result =
	 * productService.getList(pageRequestDTO);
	 * 
	 * result.getDtoList().forEach(dto -> log.info(dto)); }
	 */
	
	/* 등록 테스트
	 * @Test public void testRegister() { ProductDTO productDTO =
	 * ProductDTO.builder() .pname("새상품") .pdesc("신규 상품") .price(100) .build();
	 * 
	 * productDTO.setUploadFileNames( List.of( UUID.randomUUID()+"_"+"Test1.jpg",
	 * UUID.randomUUID()+"_"+"Test2.jpg" )); productService.register(productDTO); }
	 */
	
	@Test
	public void testRead() {
		
		Long pno = 12L;
		
		ProductDTO productDTO = productService.get(pno);
		
		log.info(productDTO);
		log.info(productDTO.getUploadFileNames());
		
	}

}
