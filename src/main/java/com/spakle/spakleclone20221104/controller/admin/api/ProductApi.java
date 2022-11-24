package com.spakle.spakleclone20221104.controller.admin.api;

import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.product.ProductAdditionReqDto;
import com.spakle.spakleclone20221104.dto.product.ProductModificationReqDto;
import com.spakle.spakleclone20221104.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//rest랑 그냥 controller 랑 뭐가 다른거
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class ProductApi {
    private final ProductService productService;

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(ProductAdditionReqDto productAdditionReqDto) throws Exception {

        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(1, "Successfully", productService.addProduct(productAdditionReqDto)));
    }


    @PostMapping("/product/modification")
    public ResponseEntity<?> getModification(ProductModificationReqDto productModificationReqDto) throws Exception{

        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(1, "Successfully", productService.updateProduct(productModificationReqDto)));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> getDtl(@PathVariable int productId)throws Exception{
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(1, "Successfully", productService.getProductDtl(productId)));
    }

    //관리자 페이지 상품리스트 조회
    @GetMapping("/inquiry/{category}")
    public ResponseEntity<?> getInquiry(@PathVariable String category) throws Exception {
        log.info("{}", productService.getProducts(category));
        return ResponseEntity.ok().body(new CMRespDto<>(1, "Successfully", productService.getProducts(category)));
    }

    @DeleteMapping("/inquiry/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable int productId) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", productService.deleteProduct(productId)));
    }

}