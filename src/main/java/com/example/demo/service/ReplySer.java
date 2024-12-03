package com.example.demo.service;

import com.example.demo.domain.ReplyDomain;
import com.example.demo.domain.PostDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.dto.ReplyDto;
import com.example.demo.repository.ReplyRep;
import com.example.demo.repository.PostRep;
import com.example.demo.repository.UserRep;
import com.example.demo.exception.ResourceNotFoundException;


import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.io.FileNotFoundException;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class ReplySer {
	private final ReplyRep replyRep;
    private final PostRep postRep;
    private final UserRep userRep;

    public List<ReplyDto> getRepliesByPostId(Long postId) {
        return replyRep.findByPostPostId(postId).stream()
                       .map(this::convertToDto)
                       .collect(Collectors.toList());
    }

    public ReplyDomain createReply(Long postId, ReplyDomain reply) {
        // Load PostDomain based on postId
        PostDomain post = postRep.findById(postId)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        // Verify that authorUserNum exists
        if (reply.getAuthor() == null || reply.getAuthor().getUserNum() == null) {
            throw new IllegalArgumentException("AuthorUserNum is required.");
        }

        UserDomain user = userRep.findById(reply.getAuthor().getUserNum())
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + reply.getAuthor().getUserNum()));

        reply.setPost(post);
        reply.setAuthor(user);
        reply.setCreateDate(LocalDateTime.now());

        return replyRep.save(reply);
    }




    public ReplyDomain updateReply(Long replyId, ReplyDomain reply) {
        ReplyDomain existingReply = replyRep.findById(replyId)
            .orElseThrow(() -> new ResourceNotFoundException("Reply not found with id: " + replyId));
        existingReply.setContent(reply.getContent());
        existingReply.setModifyDate(LocalDateTime.now());
        return replyRep.save(existingReply);
    }

    public void deleteReply(Long replyId) {
        replyRep.deleteById(replyId);
    }

    // DTO Conversion
    public ReplyDto convertToDto(ReplyDomain reply) {
        ReplyDto dto = new ReplyDto();
        dto.setId(reply.getReplyId());
        dto.setContent(reply.getContent());
        dto.setCreateDate(reply.getCreateDate());
        dto.setModifyDate(reply.getModifyDate());
        if (reply.getAuthor() != null) {
            dto.setAuthorUserNum(reply.getAuthor().getUserNum());
            dto.setAuthorName(reply.getAuthor().getUserName());
        } else {
            dto.setAuthorUserNum(null);
            dto.setAuthorName("Unknown");
        }
        return dto;
    }

    public int likeReply(Long replyId) {
        ReplyDomain reply = replyRep.findById(replyId)
            .orElseThrow(() -> new ResourceNotFoundException("Reply not found with id: " + replyId));
        reply.incrementLikes();
        replyRep.save(reply);
        return reply.getLikes();
    }

    public int unlikeReply(Long replyId) {
        ReplyDomain reply = replyRep.findById(replyId)
            .orElseThrow(() -> new ResourceNotFoundException("Reply not found with id: " + replyId));
        reply.decrementLikes();
        replyRep.save(reply);
        return reply.getLikes();
    }



}
