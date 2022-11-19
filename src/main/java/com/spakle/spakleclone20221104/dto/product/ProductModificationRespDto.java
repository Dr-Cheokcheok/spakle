package com.spakle.spakleclone20221104.dto.product;

import com.spakle.spakleclone20221104.domain.product.ProductImgFile;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ProductModificationRespDto {

    private int id;
    private String category;
    private String group;
    private String name;
    private int price;
    private int rate;
    private int retailPrice;
    private String img;
    private List<ProductImgFile> imgFiles;

}
