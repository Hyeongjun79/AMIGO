package com.mysite.mallapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mysite.mallapi.dto.CategoryDTO;
import com.mysite.mallapi.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
	
	private final CategoryRepository categoryRepository;
	
	public List<CategoryDTO> getAll() {
		return categoryRepository.findAllByOrderBySortOrderAsc()
				.stream()
				.map(c -> CategoryDTO.builder()
						.id(c.getId())
						.name(c.getName())
						.sortOrder(c.getSortOrder())
						.build())
				.toList();
	}

}
