package com.mysite.mallapi.service;

import com.mysite.mallapi.dto.PageRequestDTO;
import com.mysite.mallapi.dto.PageResponseDTO;
import com.mysite.mallapi.dto.TodoDTO;

public interface TodoService {
	Long register (TodoDTO todoDTO);
	
	TodoDTO get(Long tno);
	
	void modify(TodoDTO todoDTO);
	
	void remove(Long tno);
	
	PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO);

}
