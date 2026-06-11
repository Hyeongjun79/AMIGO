package com.mysite.mallapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mysite.mallapi.domain.CartItem;
import com.mysite.mallapi.dto.CartItemListDTO;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

	// 사용자 이메일을 통해 사용자가 담은 장바구니 아이템 조회 기능
	@Query("""
			select new com.mysite.mallapi.dto.CartItemListDTO(
			    ci.cino,
			    ci.qty,
			    p.pno,
			    p.pname,
			    p.price,
			    pi.fileName
			)
			from CartItem ci
			inner join cart mc on ci.cart = mc
			left join Product p on ci.product = p
			left join p.imageList pi
			where mc.owner.email = :email
			and pi.ord = 0
			order by ci.cino desc
			""")
	public List<CartItemListDTO> getItemsOfCartDTOByEmail(
			@Param("email") String email);

	// 사용자의 이메일과 상품번호로 현재 장바구니 아이템을 알아내는 기능
	@Query("""
			    select ci
			    from CartItem ci
			    join ci.cart c
			    where c.owner.email = :email
			      and ci.product.pno = :pno
			""")
	public CartItem getItemOfPno(@Param("email") String email,
			@Param("pno") Long pno);

	// 장바구니 아이템이 속한 장바구니 번호를 알아내는 기능
	@Query("""
		    select c.cno
		    from Cart c
		    inner join CartItem ci
		    on ci.cart = c
		    where ci.cino = :cino
		""")
	public Long getCartFromItem(@Param("cino") Long cino);

	// 카트의 번호로 해당 장바구니 아이템을 조회하는 기능
	@Query("""
			    select new com.mysite.mallapi.dto.CartItemListDTO(
			        ci.cino,
			        ci.qty,
			        p.pno,
			        p.pname,
			        p.price,
			        pi.fileName
			    )
			    from CartItem ci
			    join ci.cart mc
			    join ci.product p
			    left join p.imageList pi
			    where mc.cno = :cno
			      and pi.ord = 0
			    order by ci.cino desc
			""")
	public List<CartItemListDTO> getItemsOfCartDTOByCart(
			@Param("cno") Long cno);

}
