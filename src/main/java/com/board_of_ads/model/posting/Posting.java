package com.board_of_ads.model.posting;

import com.board_of_ads.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;


/**
 * Суперкласс для объявлений
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@MappedSuperclass
public class Posting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

//    @Column
//    private Category category;    //todo create class Category and uncomment

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private Long price;

    @Column
    private String contact;

    @Column
    private Boolean isActive;

    @Column
    private LocalDateTime datePosting;
}
