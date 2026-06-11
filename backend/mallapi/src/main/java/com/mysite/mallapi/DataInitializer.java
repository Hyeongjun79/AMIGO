package com.mysite.mallapi;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.mysite.mallapi.domain.Category;
import com.mysite.mallapi.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
	private final CategoryRepository categoryRepository;

	@Override
	public void run(String... args) {
		if (categoryRepository.count() == 0) {
			categoryRepository.saveAll(
					List.of(Category.builder().name("糸").sortOrder(1).build(), // 실
							Category.builder().name("針").sortOrder(2).build(), // 바늘
							Category.builder().name("ボタン").sortOrder(3).build(), // 단추
							Category.builder().name("副資材").sortOrder(4).build(), // 부자재
							Category.builder().name("図案").sortOrder(5).build() // 도안
					));
		}
	}

}
