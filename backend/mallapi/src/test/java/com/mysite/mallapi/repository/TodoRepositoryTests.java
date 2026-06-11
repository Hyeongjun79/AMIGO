package com.mysite.mallapi.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mysite.mallapi.domain.Todo;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class TodoRepositoryTests {
	
	@Autowired
	private TodoRepository todoRepository;
	
	@Test
	public void testModify() {
		Long tno = 79L;
		
		Optional<Todo> result = todoRepository.findById(tno);
		Todo todo = result.orElseThrow();
		todo.changeTitle("Modified 79...");
		todo.changeComplete(true);
		todo.changeDueDate(LocalDate.of(2026, 5, 1));
		todoRepository.save(todo);
	}

}
