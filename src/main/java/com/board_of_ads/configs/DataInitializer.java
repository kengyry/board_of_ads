package com.board_of_ads.configs;

import com.board_of_ads.model.Role;
import com.board_of_ads.service.interfaces.RoleService;
import com.board_of_ads.service.interfaces.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@AllArgsConstructor
public class DataInitializer {

    private final UserService userService;
    private final RoleService roleService;

    @PostConstruct
    private void init() {
        initUsers();
    }

    private void initUsers() {

        if (roleService.getRoleByName("ADMIN") == null) {
            roleService.saveRole(new Role("ADMIN"));
        }
        if (roleService.getRoleByName("USER") == null) {
            roleService.saveRole(new Role("USER"));
        }

        System.out.println(roleService.getRoleByName("USER"));
        System.out.println(roleService.getRoleByName("ADMIN"));

    }

}
