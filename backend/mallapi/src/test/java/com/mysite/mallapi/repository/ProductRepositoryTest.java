package com.mysite.mallapi.repository;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ProductRepositoryTest {
	@Autowired
	ProductRepository productRepository;
	
	
	
	
	/*
	 * //product 삽입 테스트
	 * 
	 * @Test public void testInsert() { for (int i = 0; i < 10; i++) { Product
	 * product = Product.builder() .pname("상품"+i) .price(100*i) .pdesc("상품설명" + i)
	 * .build();
	 * product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE1.jpg");
	 * product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE2.jpg");
	 * productRepository.save(product); log.info("---------------------");
	 * 
	 * } }
	 */
	/* 
	 * @Test
	 * 
	 * @Transactional public void testRead() { Long pno = 1L;
	 * 
	 * Optional<Product> result = productRepository.findById(pno);
	 * 
	 * Product product = result.orElseThrow();
	 * 
	 * log.info(product); log.info(product.getImageList()); }
	 * 
	 * @Test public void testRead2() { Long pno = 1L;
	 * 
	 * Optional<Product> result = productRepository.selectOne(pno);
	 * 
	 * Product product = result.orElseThrow();
	 * 
	 * log.info(product); log.info(product.getImageList()); }
	 */
	
	/* --------------------------삭제
	 * @Commit
	 * 
	 * @Test
	 * 
	 * @Transactional public void testDelete() { Long pno = 2L;
	 * productRepository.updateToDelete(pno, true); }
	 */
	/* --------------------------수정
	 * @Test public void testUpdate() { Long pno = 10L;
	 * 
	 * Product product = productRepository.selectOne(pno).get();
	 * 
	 * product.changeName("맛돌이"); product.changeDesc("이거 정말 맛있음");
	 * product.changePrice(9999);
	 * 
	 * product.clearList();
	 * 
	 * product.addImageString(UUID.randomUUID().toString()+"_"+"NEWIMAGE1.jpg");
	 * product.addImageString(UUID.randomUUID().toString()+"_"+"NEWIMAGE2.jpg");
	 * product.addImageString(UUID.randomUUID().toString()+"_"+"NEWIMAGE3.jpg");
	 * 
	 * productRepository.save(product); }
	 * 
	 */
	
	@Test
	public void testList() {
		
		Pageable pageable = PageRequest.of(0, 10, Sort.by("pno").descending());
		
		Page<Object[]> result = productRepository.selectList(pageable);
		
		result.getContent().forEach(arr -> log.info(Arrays.toString(arr)));
	}
}
