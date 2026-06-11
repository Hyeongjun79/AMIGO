package com.mysite.mallapi.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mysite.mallapi.dto.PageRequestDTO;
import com.mysite.mallapi.dto.PageResponseDTO;
import com.mysite.mallapi.dto.TodoDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class TodoServiceTests {
	
	@Autowired
	private TodoService todoService;
	
	/*
	 * @Test public void testGet() { Long tno = 101L; TodoDTO todoDTO =
	 * todoService.get(tno); log.info(todoDTO);
	 * 
	 * }
	 */
	
	/*
	 * @Test public void testModify() {
	 * 
	 * TodoDTO todoDTO = TodoDTO.builder() .tno(100L) .title("난 수정서비스야")
	 * .dueDate(LocalDate.of(1995, 7, 9)) .complete(true) .build();
	 * todoService.modify(todoDTO);
	 * 
	 * }
	 */
	
	/*
	 * @Test public void testRegister() {
	 * 
	 * TodoDTO todoDTO = TodoDTO.builder() .title("서비스 테스트") .writer("AKI")
	 * .dueDate(LocalDate.of(2099, 7, 9)) .build(); Long tno =
	 * todoService.register(todoDTO); log.info("TNO: " + tno); }
	 */
@Test
	public void testList() {
		
		PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
				.page(2)
				.size(8)
				.build();
		PageResponseDTO<TodoDTO> response = todoService.list(pageRequestDTO);
		log.info(response);
		}
}
