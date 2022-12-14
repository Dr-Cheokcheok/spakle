package com.spakle.spakleclone20221104.dto;

import com.spakle.spakleclone20221104.domain.Product;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class ProductAdditionReqDto {

    private String category;
    private String group;
    private String name;

    private double price;
    private double retailPrice;

    //mainImg랑 infoImg
    private MultipartFile imgFile;
    private String imgPath;


    private List<MultipartFile> files;


    public Product toProductEntity(){
        return Product.builder()
                .category(category)
                .group(group)
                .name(name)
                .price(price)
                .img(imgPath)
                .retail_price(retailPrice)
                .build();
    }
}
