function GlobleFunction() {
    MedicationList() 
    AcuteBox()
    EyeIcon()
    Plan()
}        
 
function MaleFront() {
    $(document).ready(function(){
        $("path").click(function(){
            $(this).css("opacity", "1"); 
        });
        $(".AvatarGender ul.Select li").click(function(){
            $("svg path").css("opacity", "0");    
            $('.CheckBox input').removeAttr("checked");  
        }); 

        $(".Scalp").click(function(){
            $('#MaleFrontScalp').attr("checked", "checked"); 
        });

        $(".forehead").click(function(){
            $('#MaleFrontForehead').attr("checked", "checked"); 
        });

        $(".nose").click(function(){
            $('#MaleFrontNose').attr("checked", "checked"); 
        });

        $(".mouth").click(function(){
            $('#MaleFrontMouth').attr("checked", "checked"); 
        });

        $(".face").click(function(){
            $('#MaleFrontFace').attr("checked", "checked"); 
        });

        $(".left_ear").click(function(){
            $('#MaleFrontEars').attr("checked", "checked"); 
            $("#right_ear").css("opacity", "1"); 
        });

        $(".right_ear").click(function(){
            $('#MaleFrontEars').attr("checked", "checked"); 
            $(".left_ear").css("opacity", "1"); 
        });

        $(".jaw").click(function(){
            $('#MaleFrontJaw').attr("checked", "checked"); 
        });

        $(".neck").click(function(){
            $('#MaleFrontNeck').attr("checked", "checked"); 
        });

        $(".sternum").click(function(){
            $('#MaleFrontSternum').attr("checked", "checked"); 
        });

        $(".left_chest").click(function(){
            $('#MaleFrontChest').attr("checked", "checked"); 
            $(".right_chest").css("opacity", "1"); 
        });

        $(".right_chest").click(function(){
            $('#MaleFrontChest').attr("checked", "checked"); 
            $(".left_chest").css("opacity", "1"); 
        });

        $(".left_shoulder").click(function(){
            $('#MaleFrontShoulder').attr("checked", "checked"); 
            $(".right_shoulder").css("opacity", "1"); 
        });

        $(".right_shoulder").click(function(){
            $('#MaleFrontShoulder').attr("checked", "checked"); 
            $(".left_shoulder").css("opacity", "1"); 
        });

        $(".left_armpit").click(function(){
            $('#MaleFrontArmpit').attr("checked", "checked"); 
            $(".rght_armpit").css("opacity", "1"); 
        });

        $(".rght_armpit").click(function(){
            $('#MaleFrontArmpit').attr("checked", "checked"); 
            $(".left_armpit").css("opacity", "1"); 
        });

        $(".left_upper_arm").click(function(){
            $('#MaleFrontUpperArm').attr("checked", "checked"); 
            $(".right_upper_arm").css("opacity", "1"); 
        });

        $(".right_upper_arm").click(function(){
            $('#MaleFrontUpperArm').attr("checked", "checked"); 
            $(".left_upper_arm").css("opacity", "1"); 
        });

        $(".left_elbow").click(function(){
            $('#MaleFrontElbow').attr("checked", "checked"); 
            $(".right_elbow").css("opacity", "1"); 
        });

        $(".right_elbow").click(function(){
            $('#MaleFrontElbow').attr("checked", "checked"); 
            $(".left_elbow").css("opacity", "1"); 
        });

        $("#Female_body_front #left_elbow").click(function(){
            $('#MaleFrontElbow').attr("checked", "checked"); 
            $("#Female_body_front #right_elbow").css("opacity", "1"); 
        });

        $("#Female_body_front #right_elbow").click(function(){
            $('#MaleFrontElbow').attr("checked", "checked"); 
            $("#Female_body_front #left_elbow").css("opacity", "1"); 
        });

        $(".left_forearm").click(function(){
            $('#MaleFrontForearm').attr("checked", "checked"); 
            $(".right_forearm").css("opacity", "1"); 
        });

        $(".right_forearm").click(function(){
            $('#MaleFrontForearm').attr("checked", "checked"); 
            $(".left_forearm").css("opacity", "1"); 
        });

        $(".left_forearm").click(function(){
            $('#MaleFrontForearm').attr("checked", "checked"); 
            $(".right_forearm").css("opacity", "1"); 
        });

        $(".right_forearm").click(function(){
            $('#MaleFrontForearm').attr("checked", "checked"); 
            $(".left_forearm").css("opacity", "1"); 
        });

        $(".left_wrist").click(function(){
            $('#MaleFrontWrist').attr("checked", "checked"); 
            $(".right_wrist").css("opacity", "1"); 
        });

        $(".right_wrist").click(function(){
            $('#MaleFrontWrist').attr("checked", "checked"); 
            $(".left_wrist").css("opacity", "1"); 
        });

        $(".left_hand").click(function(){
            $('#MaleFrontHand').attr("checked", "checked"); 
            $(".right_hand").css("opacity", "1"); 
        });

        $(".right_hand").click(function(){
            $('#MaleFrontHand').attr("checked", "checked"); 
            $(".left_hand").css("opacity", "1"); 
        });

        $(".left_fingers").click(function(){
            $('#MaleFrontFingers').attr("checked", "checked"); 
            $(".right_fingers").css("opacity", "1"); 
        });

        $(".right_fingers").click(function(){
            $('#MaleFrontFingers').attr("checked", "checked"); 
            $(".left_fingers").css("opacity", "1"); 
        });  

        $(".pelvic").click(function(){
            $('#MaleFrontPelvic').attr("checked", "checked"); 
        });

        $(".genitals").click(function(){
            $('#MaleFrontGenitals').attr("checked", "checked"); 
        });

        $(".left_groin").click(function(){
            $('#MaleFrontGroin').attr("checked", "checked"); 
            $(".right_groin").css("opacity", "1"); 
        });

        $(".right_groin").click(function(){
            $('#MaleFrontGroin').attr("checked", "checked"); 
            $(".left_groin").css("opacity", "1"); 
        });

        $(".left_thigh").click(function(){
            $('#MaleFrontThigh').attr("checked", "checked"); 
            $(".right_thigh").css("opacity", "1"); 
        });

        $(".right_thigh").click(function(){
            $('#MaleFrontThigh').attr("checked", "checked"); 
            $(".left_thigh").css("opacity", "1"); 
        });

        $("#left_thigh").click(function(){
            $('#MaleFrontThigh').attr("checked", "checked"); 
            $("#right_thigh").css("opacity", "1"); 
        });

        $("#right_thigh").click(function(){
            $('#MaleFrontThigh').attr("checked", "checked"); 
            $("#left_thigh").css("opacity", "1"); 
        });

        $(".left_knee").click(function(){
            $('#MaleFrontKnee').attr("checked", "checked"); 
            $(".right_knee").css("opacity", "1"); 
        });

        $(".right_knee").click(function(){
            $('#MaleFrontKnee').attr("checked", "checked"); 
            $(".left_knee").css("opacity", "1"); 
        });  

        $(".left_ankle").click(function(){
            $('#MaleFrontAnkle').attr("checked", "checked"); 
            $(".right_ankle").css("opacity", "1"); 
        });

        $(".right_ankle").click(function(){
            $('#MaleFrontAnkle').attr("checked", "checked"); 
            $(".left_ankle").css("opacity", "1"); 
        });

        $(".left_foot").click(function(){
            $('#MaleFrontFoot').attr("checked", "checked"); 
            $(".right_foot").css("opacity", "1"); 
        });

        $(".right_foot").click(function(){
            $('#MaleFrontFoot').attr("checked", "checked"); 
            $(".left_foot").css("opacity", "1"); 
        });

        $(".left_toe").click(function(){
            $('#MaleFrontToe').attr("checked", "checked"); 
            $(".right_toe").css("opacity", "1"); 
        });

        $(".right_toe").click(function(){
            $('#MaleFrontGroin').attr("checked", "checked"); 
            $(".left_toe").css("opacity", "1"); 
        }); 

        $(".upper_abdomen").click(function(){
            $('#MaleFrontUpperabdomen').attr("checked", "checked"); 
        }); 

        $(".lower_abdomen").click(function(){
            $('#MaleFrontlowerabdomen').attr("checked", "checked"); 
        });  
 


          $(".Male_left_shin").click(function(){
            $('#MaleFrontShin').attr("checked", "checked"); 
            $(".Male_right_shin").css("opacity", "1"); 
        });

        $(".Male_right_shin").click(function(){
            $('#MaleFrontShin').attr("checked", "checked"); 
            $(".Male_left_shin").css("opacity", "1"); 
        });

        $("#Female_body_front #left_shin").click(function(){
            $('#MaleFrontShin').attr("checked", "checked"); 
            $("#Female_body_front #right_shin").css("opacity", "1"); 
        });

        $("#Female_body_front #right_shin").click(function(){
            $('#MaleFrontShin').attr("checked", "checked"); 
            $("#Female_body_front #left_shin").css("opacity", "1"); 
        });

        $("#Female_body_front #left_ankle").click(function(){
            $('#MaleFrontShin').attr("checked", "checked"); 
            $("#Female_body_front #right_ankle").css("opacity", "1"); 
        });

        $("#Female_body_front #right_ankle").click(function(){
            $('#MaleFrontShin').attr("checked", "checked"); 
            $("#Female_body_front #left_ankle").css("opacity", "1"); 
        });


    });  
}

function MaleBack() {
    $(document).ready(function(){
        $("path").click(function(){
            $(this).css("opacity", "1"); 
        });   

        $("#Male_Back_Body #right_thigh").click(function(){
            $('#MaleBackHamstring').attr("checked", "checked"); 
            $("#Male_Back_Body #left_thigh").css("opacity", "1"); 
        });

        $("#Male_Back_Body #left_thigh").click(function(){
            $('#MaleBackHamstring').attr("checked", "checked"); 
            $("#Male_Back_Body #right_thigh").css("opacity", "1"); 
        });

        $("#left_back_of_knee").click(function(){
            $('#MaleBackknee').attr("checked", "checked"); 
            $("#right_back_of_knee").css("opacity", "1"); 
        });

        $("#right_back_of_knee").click(function(){
            $('#MaleBackknee').attr("checked", "checked"); 
            $("#left_back_of_knee").css("opacity", "1"); 
        });

        $("#left_calf").click(function(){
            $('#MaleBackCalf').attr("checked", "checked"); 
            $("#right_calf").css("opacity", "1"); 
        });

        $("#right_calf").click(function(){
            $('#MaleBackCalf').attr("checked", "checked"); 
            $("#left_calf").css("opacity", "1"); 
        });

        $("#buttock").click(function(){
            $('#MaleBackButtocks').attr("checked", "checked");   
        });

        $("#left_hip").click(function(){
            $('#MaleBackHip').attr("checked", "checked"); 
            $("#right_hip").css("opacity", "1"); 
        });

        $("#right_hip").click(function(){
            $('#MaleBackHip').attr("checked", "checked"); 
            $("#left_hip").css("opacity", "1"); 
        });

        $("#tail_bone").click(function(){
            $('#MaleBackTailbone').attr("checked", "checked");  
        });

        $("#lower_back").click(function(){
            $('#MaleBackLowerback').attr("checked", "checked");  
        });

        $("#back").click(function(){
            $('#MaleBackBack').attr("checked", "checked");  
        });

        $("#left_flank").click(function(){
            $('#MaleBackFlank').attr("checked", "checked"); 
            $("#right_flank").css("opacity", "1"); 
        });

        $("#right_flank").click(function(){
            $('#MaleBackFlank').attr("checked", "checked"); 
            $("#left_flank").css("opacity", "1"); 
        });

        $("#upper_back").click(function(){
            $('#MaleBackUpperBack').attr("checked", "checked");  
        });

        $("#Male_Back_Body #left_shoulder").click(function(){
            $('#MaleBackShoulder').attr("checked", "checked"); 
            $("#Male_Back_Body #right_shoulder").css("opacity", "1"); 
        });

        $("#Male_Back_Body #right_shoulder").click(function(){
            $('#MaleBackShoulder').attr("checked", "checked"); 
            $("#Male_Back_Body #left_shoulder").css("opacity", "1"); 
        });

        $("#Male_Back_Body #left_arm").click(function(){
            $('#MaleBackUpperArm').attr("checked", "checked"); 
            $("#Male_Back_Body #right_arm").css("opacity", "1"); 
        });

        $("#Male_Back_Body #right_arm").click(function(){
            $('#MaleBackUpperArm').attr("checked", "checked"); 
            $("#Male_Back_Body #left_arm").css("opacity", "1"); 
        });

        $("#Male_Back_Body #left_elbow").click(function(){
            $('#MaleBackElbow').attr("checked", "checked"); 
            $("#Male_Back_Body #right_elbow").css("opacity", "1"); 
        });

        $("#Male_Back_Body #right_elbow").click(function(){
            $('#MaleBackElbow').attr("checked", "checked"); 
            $("#Male_Back_Body #left_elbow").css("opacity", "1"); 
        });

        $("#Male_Back_Body #left_forearms").click(function(){
            $('#MaleBackForearm').attr("checked", "checked"); 
            $("#Male_Back_Body #right_forearms").css("opacity", "1"); 
        });

        $("#Male_Back_Body #right_forearms").click(function(){
            $('#MaleBackForearm').attr("checked", "checked"); 
            $("#Male_Back_Body #left_forearms").css("opacity", "1"); 
        });

        $("#Male_Back_Body #left_wrist").click(function(){
            $('#MaleBackWrist').attr("checked", "checked"); 
            $("#Male_Back_Body #right_wrist").css("opacity", "1"); 
        });

        $("#Male_Back_Body #right_wrist").click(function(){
            $('#MaleBackWrist').attr("checked", "checked"); 
            $("#Male_Back_Body #left_wrist").css("opacity", "1"); 
        });

        $("#Male_Back_Body #left_palm").click(function(){
            $('#MaleBackHand').attr("checked", "checked"); 
            $("#Male_Back_Body #right_palm").css("opacity", "1"); 
        });

        $("#Male_Back_Body #right_palm").click(function(){
            $('#MaleBackHand').attr("checked", "checked"); 
            $("#Male_Back_Body #left_palm").css("opacity", "1"); 
        });

        $("#Male_Back_Body #left_fingers").click(function(){
            $('#MaleBackFingers').attr("checked", "checked"); 
            $("#Male_Back_Body #right_fingers").css("opacity", "1"); 
        });

        $("#Male_Back_Body #right_fingers").click(function(){
            $('#MaleBackFingers').attr("checked", "checked"); 
            $("#Male_Back_Body #left_fingers").css("opacity", "1"); 
        });

    });  
}

function FemaleBack() {
    $(document).ready(function(){
        $("path").click(function(){
            $(this).css("opacity", "1"); 
        });   

        $("#female_body_back #right_hamstring").click(function(){
            $('#MaleBackHamstring').attr("checked", "checked"); 
            $("#female_body_back #left_hamstring").css("opacity", "1"); 
        });

        $("#female_body_back #left_hamstring").click(function(){
            $('#MaleBackHamstring').attr("checked", "checked"); 
            $("#female_body_back #right_hamstring").css("opacity", "1"); 
        });

        $("#female_body_back #left_back_of_knee").click(function(){
            $('#MaleBackknee').attr("checked", "checked"); 
            $("#female_body_back #right_back_of_knee").css("opacity", "1"); 
        });

        $("#female_body_back #right_back_of_knee").click(function(){
            $('#MaleBackknee').attr("checked", "checked"); 
            $("#female_body_back #left_back_of_knee").css("opacity", "1"); 
        });

        $("#female_body_back #left_calf").click(function(){
            $('#MaleBackCalf').attr("checked", "checked"); 
            $("#female_body_back #rght_calf").css("opacity", "1"); 
        });

        $("#female_body_back #rght_calf").click(function(){
            $('#MaleBackCalf').attr("checked", "checked"); 
            $("#female_body_back #left_calf").css("opacity", "1"); 
        });

        $("#female_body_back #buttock").click(function(){
            $('#MaleBackButtocks').attr("checked", "checked");   
        });

        $("#female_body_back #left_hip").click(function(){
            $('#MaleBackHip').attr("checked", "checked"); 
            $("#female_body_back #right_hip").css("opacity", "1"); 
        });

        $("#female_body_back #right_hip").click(function(){
            $('#MaleBackHip').attr("checked", "checked"); 
            $("#female_body_back #left_hip").css("opacity", "1"); 
        });

        $("#female_body_back #tail_bone").click(function(){
            $('#MaleBackTailbone').attr("checked", "checked");  
        });

        $("#female_body_back #lower_back").click(function(){
            $('#MaleBackLowerback').attr("checked", "checked");  
        });

        $("#female_body_back #back").click(function(){
            $('#MaleBackBack').attr("checked", "checked");  
        });

        $("#female_body_back #left_flank").click(function(){
            $('#MaleBackFlank').attr("checked", "checked"); 
            $("#female_body_back #right_flank").css("opacity", "1"); 
        });

        $("#female_body_back #right_flank").click(function(){
            $('#MaleBackFlank').attr("checked", "checked"); 
            $("#female_body_back #left_flank").css("opacity", "1"); 
        });

        $("#female_body_back #upper_back").click(function(){
            $('#MaleBackUpperBack').attr("checked", "checked");  
        });

        $("#female_body_back #left_shoulder").click(function(){
            $('#MaleBackShoulder').attr("checked", "checked"); 
            $("#female_body_back #right_shoulder").css("opacity", "1"); 
        });

        $("#female_body_back #right_shoulder").click(function(){
            $('#MaleBackShoulder').attr("checked", "checked"); 
            $("#female_body_back #left_shoulder").css("opacity", "1"); 
        });

        $("#female_body_back #left_arm").click(function(){
            $('#MaleBackUpperArm').attr("checked", "checked"); 
            $("#female_body_back #right_arm").css("opacity", "1"); 
        });

        $("#female_body_back #right_arm").click(function(){
            $('#MaleBackUpperArm').attr("checked", "checked"); 
            $("#female_body_back #left_arm").css("opacity", "1"); 
        });

        $("#female_body_back #left_elbow").click(function(){
            $('#MaleBackElbow').attr("checked", "checked"); 
            $("#female_body_back #right_elbow").css("opacity", "1"); 
        });

        $("#female_body_back #right_elbow").click(function(){
            $('#MaleBackElbow').attr("checked", "checked"); 
            $("#female_body_back #left_elbow").css("opacity", "1"); 
        });

        $("#female_body_back #left_forearms").click(function(){
            $('#MaleBackForearm').attr("checked", "checked"); 
            $("#female_body_back #right_forearms").css("opacity", "1"); 
        });

        $("#female_body_back #right_forearms").click(function(){
            $('#MaleBackForearm').attr("checked", "checked"); 
            $("#female_body_back #left_forearms").css("opacity", "1"); 
        });

        $("#female_body_back #left_wrist").click(function(){
            $('#MaleBackWrist').attr("checked", "checked"); 
            $("#female_body_back #right_wrist").css("opacity", "1"); 
        });

        $("#female_body_back #right_wrist").click(function(){
            $('#MaleBackWrist').attr("checked", "checked"); 
            $("#female_body_back #left_wrist").css("opacity", "1"); 
        });

        $("#female_body_back #left_palm").click(function(){
            $('#MaleBackHand').attr("checked", "checked"); 
            $("#female_body_back #right_palm").css("opacity", "1"); 
        });

        $("#female_body_back #right_palm").click(function(){
            $('#MaleBackHand').attr("checked", "checked"); 
            $("#female_body_back #left_palm").css("opacity", "1"); 
        });

        $("#female_body_back .female_left_fingers").click(function(){
            $('#MaleBackFingers').attr("checked", "checked"); 
            $("#female_body_back .female_right_fingers").css("opacity", "1"); 
        });

        $("#female_body_back .female_right_fingers").click(function(){
            $('#MaleBackFingers').attr("checked", "checked"); 
            $("#female_body_back .female_left_fingers").css("opacity", "1"); 
        });

        $("#female_body_back .female_left_hand").click(function(){
            $('#MaleBackHand').attr("checked", "checked"); 
            $("#female_body_back .female_right_hand").css("opacity", "1"); 
        });

        $("#female_body_back .female_right_hand").click(function(){
            $('#MaleBackHand').attr("checked", "checked"); 
            $("#female_body_back .female_left_hand").css("opacity", "1"); 
        });

        $("#female_body_back .female_left_forearm").click(function(){
            $('#MaleBackForearm').attr("checked", "checked"); 
            $("#female_body_back .female_right_forearm").css("opacity", "1"); 
        });

        $("#female_body_back .female_right_forearm").click(function(){
            $('#MaleBackForearm').attr("checked", "checked"); 
            $("#female_body_back .female_left_forearm").css("opacity", "1"); 
        });

        $("#female_body_back .female_left_wrist").click(function(){
            $('#MaleBackWrist').attr("checked", "checked"); 
            $("#female_body_back .female_right_wrist").css("opacity", "1"); 
        });

        $("#female_body_back .female_right_wrist").click(function(){
            $('#MaleBackWrist').attr("checked", "checked"); 
            $("#female_body_back .female_left_wrist").css("opacity", "1"); 
        });

        $("#Female_body_front-2 #Left_fingers").click(function(){
            $('#MaleFrontFingers').attr("checked", "checked"); 
            $("#Female_body_front-2 #right_fingers").css("opacity", "1"); 
        });

        $("#Female_body_front-2 #right_fingers").click(function(){
            $('#MaleFrontFingers').attr("checked", "checked"); 
            $("#Female_body_front-2 #Left_fingers").css("opacity", "1"); 
        });

        $(".Female_Neck").click(function(){
            $('#FeMaleBackNeck').attr("checked", "checked");  
        }); 

        $(".Female_Head-2").click(function(){
            $('#FeMaleBackHead').attr("checked", "checked");  
        });

        $("#left_breast").click(function(){
            $('#MaleFrontBreast').attr("checked", "checked");
            $("#right_breast").css("opacity", "1");   
        });

        $("#right_breast").click(function(){
            $('#MaleFrontBreast').attr("checked", "checked");
            $("#left_breast").css("opacity", "1");   
        });

        $(".Back_Neck").click(function(){
            $('#FeMaleBackNeck').attr("checked", "checked");  
        }); 

        $(".Female_Head-2").click(function(){
            $('#FeMaleBackHead').attr("checked", "checked");  
        });
 

    });  
}
     

function MedicationList() {
    $(document).ready(function () {
        $('#Medicateopen').click(function(){
            $(".MedicationList").css("display", "block");  
            $("button").removeClass("Disable"); 
        });
    });   
} 

function DaySelect(){
    $(".fc-daygrid-day").click(function(){
        $(this).addClass("active");
    });

    $('.fc-daygrid-day-number').bind('click', function() { 
        $('.active').removeClass('active') 
        $(this).addClass('active');
    });
}

function Header() {
    $(document).ready(function () {
        $('.Toggle').click(function(){
            $(".SidenavArea").addClass("pull");  
        });
    });
    $(document).ready(function () {
        $('.Close').click(function(){
            $(".SidenavArea").removeClass("pull");  
        });
    });
}

function ActiveFunction() {
    $(document).ready(function () {
        $('.SessionTab ul li span').bind('click', function() { 
            $('.active').removeClass('active') 
            $(this).addClass('active');
        });
    });
}

// function AcuteBox() {
//     $(document).ready(function () {
//         $('#AcuteOpen p').click(function(){
//             $("#AcuteFirst").slideDown();  
//             $("button").removeClass("Disable"); 
//         }); 
//     });
//     $(document).ready(function () {
//         $('.AcuteIcon').click(function(){
//             $("#AcuteFirst").slideUp();  
//             $(".SymptomsRange").css("display", "block"); 
//         });
//     });
//     $(document).ready(function () {
//         $('.AddSymptoms').click(function(){
//             $(".SecondSymptoms").slideDown();    
//         });
//     });
// }

function Plan() { 
    $(document).ready(function () {
        $('#ChangePlan').click(function(){
            $("#PlanList").slideDown();   
            $("#ChangePlan").css("display", "none");  
        });
    });
    $(document).ready(function () {
        $('#Update').click(function(){
            $("#PlanList").slideUp();   
            $("#Update").css("display", "none");  
            $("#ChangePlan").css("display", "block"); 
        });
    });
}

function AddSymptoms() {
    $(document).ready(function () {
        $('.AddSymptoms').click(function(){
            $("#SecondSymtoms").slideDown();   
        });
    });
}

function SideBarFunction() {
    $(document).ready(function(){
        $("#FilterOpen").click(function(){
            $("body").addClass("side-open");  
            $(".FilterArea").css({"transform": "translate(0%, 0px)"});
        }); 
        $(".Close").click(function(){
            $("body").removeClass("side-open");  
            $(".FilterArea").css({"transform": "translate(120%, 0px)"});
        });  
    });  
} 

function EyeIcon() {
    $(document).ready(function(){
        $(".Cross").click(function(){
            $(this).toggleClass("active");
        });
    });
}



function uploader(){

    function readURL(input, imgControlName) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            $(imgControlName).attr('src', e.target.result);
            //$(input).parent().siblings('.preview1').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
        }
      }
      
      $("#imag1").change(function() {
        // add your logic to decide which image control you'll use
        var imgControlName = "#ImgPreview1";
        readURL(this, imgControlName);
        $('.preview1').addClass('it');
        $('.btn-rmv1').addClass('rmv');
        $('#ImgPreview1').css('display','block');
      });

      $("#imag2").change(function() {
        // add your logic to decide which image control you'll use
        var imgControlName = "#ImgPreview2";
        readURL(this, imgControlName);
        $('.preview2').addClass('it');
        $('.btn-rmv2').addClass('rmv');
        $('#ImgPreview2').css('display','block');
      });
   
      
      $("#removeImage1").click(function(e) {
        e.preventDefault();
        $("#imag1").val("");
        $("#ImgPreview1").attr("src", "");
        $('#ImgPreview1').css('display','none');
        $('.preview1').removeClass('it');
        $('.btn-rmv1').removeClass('rmv');
      });
 
      
}
