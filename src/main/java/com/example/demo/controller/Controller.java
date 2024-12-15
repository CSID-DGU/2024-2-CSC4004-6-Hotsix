package com.example.demo.controller;

import com.example.demo.domain.PostDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.repository.PostRep;
import com.example.demo.repository.UserRep;
import com.example.demo.service.PostSer;
import com.example.demo.service.UserSer;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@org.springframework.stereotype.Controller
public class Controller {

    @Autowired
    private UserRep userRepository;


    private PostRep postRepository;

    private final UserSer userSer;
    private final PostSer postSer;

    // 모든 경로를 index.html로 매핑 (정적 파일 제외)
    @GetMapping("/{path:^(?!.*\\.).*$}")
    public String forward() {
        return "forward:/index.html";
    }


    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody UserDomain loginRequest,
                                   BindingResult bindingResult,
                                   HttpServletRequest httpServletRequest
    ) {

        boolean isFirstLogin;
        //검증 오류가 있는 지 먼저 확인
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Map.of("error", "Binding Failed"));
        }

        //입력받은 id에 해당하는 데이터 가져오기
        Optional<UserDomain> userOptional = userSer.optionalUserDomain(loginRequest.getId());

        //아이디가 없는 경우
        if (userOptional.isEmpty()) {
//            bindingResult.reject("SignInError", "아이디 또는 비밀번호가 틀렸습니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "ID does not exist"));
        }

        //아이디가 존재
        UserDomain user = userOptional.get();

        //비밀번호가 틀린 경우
        if(!user.getPassword().equals(loginRequest.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid Password"));
        }
        //로그인 성공 시
        else {
            // 로그인 성공 시 JWT 발급
            String token = null;
            try {
                token = userSer.generateToken(user.getId());
            } catch (Exception e) {
                e.printStackTrace(); // 서버 콘솔에 오류 로그 출력
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Token generation failed"));
            }



            //기존 세션 파기
            httpServletRequest.getSession().invalidate();
            HttpSession session = httpServletRequest.getSession(true);

            //세션 아이디 설정
            session.setAttribute("ID",user.getId());

            //세션 유지 기간 : 30분
            session.setMaxInactiveInterval(1800);

            boolean isFirstLogin1 = user.getIsFirstLogin();

            userSer.firstLogin(user);

            return ResponseEntity.ok()
                    .body(Map.of(
                            "token", token,
                            "isFirstLogin", isFirstLogin1
                    ));
        }
    }

    @PostMapping("signUp")
    @ResponseBody
    public ResponseEntity<?> Signup(@RequestParam("id") String id,
                                    @RequestParam("password") String password,
                                    @RequestParam("userName") String userName,
                                    @RequestParam("birthDate") String birthDate,
                                    @RequestParam("phoneNum") String phoneNum,
                                    @RequestParam("userLocation") String userLocation,
                                    @RequestParam("profileImagePath") MultipartFile profile
    ){


        System.out.println("userLocation : " + userLocation);
        String Dir =
//                    이 부분 본인 프로젝트 디렉토리 경로로 변경

//                     명훈 디렉토리 경로1
//				"C:\\Users\\pc\\Desktop\\Hotsix\\" +
//                    명훈 디렉토리 경로2
                "/Users/jinmyeonghun/Desktop/3-2/공소/2024-2-CSC4004-6-Hotsix/" +
//
                        //여기는 윈도우 공통 경로
//						"src\\main\\resources\\static\\asset\\Images\\postImage\\";
                        //여기는 mac 공통 경로
                        "src/main/resources/static/asset/Images/userProfile/";

        String fileName = profile.getOriginalFilename();

        // UserDomain 객체 생성
        UserDomain user = new UserDomain();
        user.setId(id);
        user.setPassword(password);
        user.setUserName(userName);
        user.setBirthDate(Date.valueOf(birthDate));
        user.setPhoneNum(phoneNum);
        user.setProfileImagePath(fileName);
        user.setUserLocation(userLocation);

        try {
            // 파일 저장
            profile.transferTo(new File(Dir + fileName));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }

        //회원가입 성공
        if(userSer.createUser(user)){
            return ResponseEntity.ok("SignUp completed");
        }
        //회원가입 실패
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "DuplicatedId"));
        }
    }

    @PostMapping("survey/{id}")
    public ResponseEntity<?> survey(@RequestBody UserDomain user,
                                    @PathVariable String id
                                    ){
        Optional<UserDomain> userOptional = userSer.optionalUserDomain(id);
        UserDomain foundUser = userOptional.get();

        foundUser.setMbti(user.getMbti());
        foundUser.setMeetingFrequency(user.getMeetingFrequency());
        foundUser.setExpectedBudgetRange(user.getExpectedBudgetRange());
        foundUser.setRelationshipDate(user.getRelationshipDate());
        foundUser.setActivityPreference(user.getActivityPreference());
        foundUser.setPreferredCourse(user.getPreferredCourse());
        foundUser.setStartTime(user.getStartTime());
        foundUser.setPreferredLocation(user.getPreferredLocation());
        foundUser.setTransportType(user.getTransportType());

        userSer.saveSurveyResult(foundUser);
        return ResponseEntity.ok("Save Completed");
    }

    @GetMapping("userNameAndUserProfile/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {

        String userName = userSer.getUserNameById(id);
        String userProfile = userSer.getProfileImagePathById(id);

        return ResponseEntity.ok().body(Map.of(
                "userName", userName,
                "profileImagePath",userProfile
        ));

    }
    @GetMapping("userName/{id}")
    public ResponseEntity<?> getUserNameById(@PathVariable String id) {

        String userName = userSer.getUserNameById(id);

        return ResponseEntity.ok().body(Map.of("userName", userName));

    }
    @GetMapping("userProfile/{id}")
    public ResponseEntity<?> getUserProfileById(@PathVariable String id) {

        String profileImagePath = userSer.getProfileImagePathById(id);

        return ResponseEntity.ok().body(Map.of("profileImagePath", profileImagePath));

    }
    @GetMapping("/userNum/{id}")
    public ResponseEntity<?> getUserNumById(@PathVariable String id) {
        Long userNum = userSer.getUserNumById(id); // 通过 id 获取 userNum
        if (userNum != null) {
            return ResponseEntity.ok(userNum); // 返回 userNum
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found"); // 如果找不到用户，则返回 404 错误
        }
    }
    @PostMapping("recommendationCourse/{id}")
    public ResponseEntity<?> saveRecommendationResult (@PathVariable String id,
                                                       @RequestBody UserDomain userDomain
                                                       ){
        UserDomain user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + id));

        user.setActivityPreference(userDomain.getActivityPreference());
        user.setTransportType(userDomain.getTransportType());
        user.setStartTime(userDomain.getStartTime());
        user.setRequiredCourse(userDomain.getRequiredCourse());
        user.setRequiredLocation(userDomain.getRequiredLocation());
        user.setDayBudgetRange(userDomain.getDayBudgetRange());


        userRepository.save(user);

        return ResponseEntity.ok("선호도 조사 완료");
    }
    @GetMapping("/userDetail/{userId}")
    public ResponseEntity<?> getUserDetail(@PathVariable String userId) {
        UserDomain user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        return ResponseEntity.ok().body(Map.of(
                "activityPreference", user.getActivityPreference() != null ? user.getActivityPreference() : "N/A",
                "dayBudgetRange", user.getDayBudgetRange() != null ? user.getDayBudgetRange() : "N/A",
                "requiredLocation", user.getRequiredLocation() != null ? user.getRequiredLocation() : "N/A",
                "mbti", user.getMbti() != null ? user.getMbti() : "N/A",
                "preferredCourse", user.getPreferredCourse() != null ? user.getPreferredCourse() : "N/A",
                "requiredCourse", user.getRequiredCourse() != null ? user.getRequiredCourse() : "N/A",
                "startTime", user.getStartTime() != null ? user.getStartTime() : "N/A",
                "transportType", user.getTransportType() != null ? user.getTransportType() : "N/A",
                "userLocation", user.getUserLocation() != null ? user.getUserLocation() : "N/A",
                "expectedBudget", user.getExpectedBudgetRange() != null ? user.getExpectedBudgetRange() : "N/A"
        ));
    }
    @GetMapping("/accumulateBingoPoint")
    public void accumulateBingoPoint(@RequestParam("userId")String userId,
                                     @RequestParam("bingoPoint")Long bingoPoint
    ){
        UserDomain user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        user.setBingoPoint(user.getBingoPoint() + bingoPoint);
        userRepository.save(user);
    }
    @GetMapping("/getBingoPoint/{id}")
    public ResponseEntity<?> getBingoPoint(@PathVariable String id){
        UserDomain user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
        return ResponseEntity.ok().body(Map.of(
                "bingoPoint" ,user.getBingoPoint()
        ));
    }
}
