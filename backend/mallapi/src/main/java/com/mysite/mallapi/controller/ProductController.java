package com.mysite.mallapi.controller;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mysite.mallapi.dto.PageRequestDTO;
import com.mysite.mallapi.dto.PageResponseDTO;
import com.mysite.mallapi.dto.ProductDTO;
import com.mysite.mallapi.service.ProductService;
import com.mysite.mallapi.util.CustomFileUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/products")
public class ProductController {
	
	private final ProductService productService;
	private final CustomFileUtil fileUtil;
	
	@PostMapping("/")
	public Map<String, Long> register(@Valid ProductDTO productDTO){
		log.info("rgister:" + productDTO);
		List<MultipartFile> files = productDTO.getFiles();
		List<String> uploadFileNames = fileUtil.saveFiles(files);
		productDTO.setUploadFileNames(uploadFileNames);
		log.info(uploadFileNames);
		Long pno = productService.register(productDTO);
		return Map.of("result", pno);
	}
	
	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFileGET(@PathVariable("fileName") String fileName){
		return fileUtil.getFile(fileName);
	}
	
	@PreAuthorize("hasAnyRole('USER')")
	@GetMapping("/list")
	public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
		
		return productService.getList(pageRequestDTO);
		
	}
	@GetMapping("/{pno}")
	public ProductDTO read(@PathVariable(name="pno") Long pno) {
		return productService.get(pno);
	}
	
	@PutMapping("/{pno}")
	public Map<String, String> modify(@PathVariable(name="pno")Long pno, ProductDTO productDTO){
		
		productDTO.setPno(pno);
		
		ProductDTO oldProductDTO = productService.get(pno);
		
		List<String> oldFileNames = oldProductDTO.getUploadFileNames();
		List<MultipartFile> files = productDTO.getFiles();
		
		List<String> currentUploadFileNames = fileUtil.saveFiles(files);
		
		List<String> uploadedFileNames = productDTO.getUploadFileNames();
		
		if(currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
			uploadedFileNames.addAll(currentUploadFileNames);
		}
		
		productService.modify(productDTO);
		
		if(oldFileNames != null && oldFileNames.size() > 0 ) {
			
			List<String> removeFiles = oldFileNames
					.stream()
					.filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
			fileUtil.deleteFiles(removeFiles);
		}
		return Map.of("RESULT", "SUCCESS MODIFY");
	}
	
	@DeleteMapping("/{pno}")
	public Map<String, String> remove(@PathVariable("pno")Long pno){
		
		List<String> oldFileNames = productService.get(pno).getUploadFileNames();
		
		productService.remove(pno);
		
		fileUtil.deleteFiles(oldFileNames);
		return Map.of("RESULT","SUCCESS REMOVE");
	}
	
	

}
