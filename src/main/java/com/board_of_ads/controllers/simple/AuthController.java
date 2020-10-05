package com.board_of_ads.controllers.simple;

import com.board_of_ads.service.interfaces.OAuth2Service;
import com.board_of_ads.service.interfaces.VkService;
import com.board_of_ads.service.interfaces.YandexService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@RequestMapping("/social")
public class AuthController {

    private final YandexService yandexService;
    private final VkService vkService;
    private final OAuth2Service OAuth2Service;

    @GetMapping("/auth")
    public String auth() {
        return OAuth2Service.auth();
    }

    @GetMapping("/auth_facebook")
    public String facebookAuth() {
        return "redirect:/oauth2/authorization/facebook";
    }

    @GetMapping("/auth_google")
    public String googleAuth() {
        return "redirect:/oauth2/authorization/google";
    }

    @GetMapping("/auth_vk")
    public String vkAuth(@RequestParam(value = "code", required = false) String code, Model model) {
        if (code == null) {
            return "redirect:" + vkService.getAuthURL();
        }
        vkService.auth(code);
        return "redirect:/";
    }

    @GetMapping("/auth_yandex")
    public String yandexAuth(@RequestParam(value = "code", required = false) String code, Model model) {
        if (code == null) {
            return "redirect:" + yandexService.getAuthURL();
        }
        yandexService.auth(code);
        return "redirect:/";
    }
}