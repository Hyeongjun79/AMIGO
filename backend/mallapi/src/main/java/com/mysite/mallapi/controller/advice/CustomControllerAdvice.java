package com.mysite.mallapi.controller.advice;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.mysite.mallapi.util.CustomJWTException;

@RestControllerAdvice
public class CustomControllerAdvice {
	
	@ExceptionHandler(NoSuchElementException.class)
	protected ResponseEntity<?> notExist(NoSuchElementException e) {
		
		String msg = e.getMessage();
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("msg", msg));
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	protected ResponseEntity<Map<String,String>> handleValid(MethodArgumentNotValidException e){
		Map<String, String> errorMap = new HashMap<>();
		
		e.getBindingResult().getFieldErrors().forEach(error -> {
			errorMap.put(error.getField(), error.getDefaultMessage());
		});
		
		return ResponseEntity.badRequest().body(errorMap);
	}
	@ExceptionHandler(CustomJWTException.class)
	protected ResponseEntity<?> handleJWTException(CustomJWTException e) {
		
		String msg = e.getMessage();
		
		return ResponseEntity.ok().body(Map.of("error", msg));
	}

}
