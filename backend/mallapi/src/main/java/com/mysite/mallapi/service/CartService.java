package com.mysite.mallapi.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.mysite.mallapi.dto.CartItemDTO;
import com.mysite.mallapi.dto.CartItemListDTO;

@Transactional
public interface CartService {
	
	//장바구니 아이템 추가 변경
	public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO);
	//모든 장바구니 아이템 목록
	public List<CartItemListDTO> getCartItems(String email);
	//아이템 삭제
	public List<CartItemListDTO> remove(Long cino);

}
