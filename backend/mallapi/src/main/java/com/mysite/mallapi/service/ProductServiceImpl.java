package com.mysite.mallapi.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mysite.mallapi.domain.Category;
import com.mysite.mallapi.domain.Product;
import com.mysite.mallapi.domain.ProductImage;
import com.mysite.mallapi.dto.PageRequestDTO;
import com.mysite.mallapi.dto.PageResponseDTO;
import com.mysite.mallapi.dto.ProductDTO;
import com.mysite.mallapi.repository.CategoryRepository;
import com.mysite.mallapi.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
	
	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	
	@Override
	public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {
		log.info("getList.................");
		
		Pageable pageable = PageRequest.of(
				pageRequestDTO.getPage() -1,
				pageRequestDTO.getSize(),
				Sort.by("pno").descending());
		
		Long categoryId = pageRequestDTO.getCategory();
		Page<Object[]> result = (categoryId != null)
				? productRepository.selectListByCategory(categoryId, pageable)
				: productRepository.selectList(pageable);

		List<ProductDTO> dtoList = result.get().map(arr -> {

			Product product = (Product) arr[0];
			ProductImage productImage = (ProductImage) arr[1];

			ProductDTO productDTO = ProductDTO.builder()
					.pno(product.getPno())
					.pname(product.getPname())
					.pdesc(product.getPdesc())
					.price(product.getPrice())
					.categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
					.build();
			String imageStr = productImage.getFileName();
			productDTO.setUploadFileNames(List.of(imageStr));
			
			return productDTO;
		}).collect(Collectors.toList());
		
		long totalCount = result.getTotalElements();
		return PageResponseDTO.<ProductDTO>withAll()
				.dtoList(dtoList)
				.totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO)
				.build();
	}
	
	@Override
	public Long register(ProductDTO productDTO) {
		Product product = dtoToEntity(productDTO);
		Product result = productRepository.save(product);
		return result.getPno();
	}
	
	private Product dtoToEntity(ProductDTO productDTO) {
		Product product = Product.builder()
				.pname(productDTO.getPname())
				.pno(productDTO.getPno())
				.pdesc(productDTO.getPdesc())
				.price(productDTO.getPrice())
				.build();

		if (productDTO.getCategoryId() != null) {
			Category category = categoryRepository.findById(productDTO.getCategoryId()).orElse(null);
			product.changeCategory(category);
		}

		List<String> uploadFileNames = productDTO.getUploadFileNames();
		if (uploadFileNames == null) {
			return product;
		}
		uploadFileNames.forEach(product::addImageString);

		return product;
	}
	
	@Override
	public ProductDTO get(Long pno) {
		java.util.Optional<Product> result = productRepository.selectOne(pno);
		Product product = result.orElseThrow();
		ProductDTO productDTO = entityToDTO(product);
		return productDTO;
	}
	private ProductDTO entityToDTO(Product product) {
		ProductDTO productDTO = ProductDTO.builder()
				.pno(product.getPno())
				.pname(product.getPname())
				.pdesc(product.getPdesc())
				.price(product.getPrice())
				.categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
				.build();
		List<ProductImage> imageList = product.getImageList();
		
		if(imageList == null || imageList.size() == 0) {
			return productDTO;
		}
		List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();
		
		productDTO.setUploadFileNames(fileNameList);
		return productDTO;
	}
	@Override
	public void modify(ProductDTO productDTO) {
		
		Optional<Product> result = productRepository.findById(productDTO.getPno());
		
		Product product = result.orElseThrow();
		
		product.changeName(productDTO.getPname());
		product.changeDesc(productDTO.getPdesc());
		product.changePrice(productDTO.getPrice());

		if (productDTO.getCategoryId() != null) {
			Category category = categoryRepository.findById(productDTO.getCategoryId()).orElse(null);
			product.changeCategory(category);
		}
		
		product.clearList();
		
		List<String> uploadFileNames = productDTO.getUploadFileNames();
		
		if(uploadFileNames != null && uploadFileNames.size() > 0) {
			uploadFileNames.stream().forEach(uploadName -> {
				product.addImageString(uploadName);
			});
		}
		productRepository.save(product);
	}
	@Override
	public void remove(Long pno) {
		productRepository.updateToDelete(pno, true);
	}

}
