package com.board_of_ads.controllers.rest;

import com.board_of_ads.models.dto.CategoryDto;
import com.board_of_ads.service.interfaces.CategoryService;
import com.board_of_ads.util.Error;
import com.board_of_ads.util.ErrorResponse;
import com.board_of_ads.util.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/category")
@AllArgsConstructor
public class CategoryRestController {

    private final CategoryService categoryService;

    @GetMapping()
    public Response<Set<CategoryDto>> findAll() {
        var categories = categoryService.findAllCategory();
        return (categories.size() > 0)
                ? Response.ok(categories)
                : new ErrorResponse<>(new Error(204, "No found categories"));
    }
}