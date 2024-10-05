import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
// declare function MaleFront(): any;
// declare function MaleBack(): any;
// declare function FemaleBack(): any;
declare var $: any;

@Component({
  selector: 'app-checkin-avatar',
  templateUrl: './checkin-avatar.component.html',
  styleUrls: ['./checkin-avatar.component.css']
})
export class CheckinAvatarComponent implements OnInit {

  // checkForm: FormGroup;

  public Gender = false
  public MaleAvater = true
  public FemaleAvater = true

  selectedBody: any = []

  ids: any = []

  frontBody: any = [
    {
      mainBody: 'Head',
      subBody: [
        {
          name: 'Scalp'
        },
        {
          name: 'Forehead'
        },
        {
          name: 'Nose'
        },
        {
          name: 'Mouth'
        },
        {
          name: 'Face'
        },
        {
          name: 'Ears'
        },
        {
          name: 'Jaw'
        }
      ]
    },
    {
      mainBody: 'Neck',
      subBody: [
        {
          name: 'Neck'
        }
      ]
    },
    {
      mainBody: 'Chest',
      subBody: [
        {
          name: 'Sternum'
        },
        {
          name: 'Breast'
        }, {
          name: 'Chest'
        }
      ]
    },
    {
      mainBody: 'Abdomen',
      subBody: [
        {
          name: 'Upper Abdomen'
        },
        {
          name: 'Lower Abdomen'
        }
      ]
    },
    {
      mainBody: 'Arms',
      subBody: [
        {
          name: 'Shoulder'
        },
        {
          name: 'Armpit'
        },
        {
          name: 'Upper Arm'
        },
        {
          name: 'Elbow'
        },
        {
          name: 'Forearm'
        },
        {
          name: 'Wrist'
        },
        {
          name: 'Hand'
        },
        {
          name: 'Fingers'
        }
      ]
    },
    {
      mainBody: 'Pelvis',
      subBody: [
        {
          name: 'Pelvic'
        },
        {
          name: 'Genitals'
        },
        {
          name: 'Groin'
        }
      ]
    },
    {
      mainBody: 'Legs',
      subBody: [
        {
          name: 'Thigh'
        },
        {
          name: 'Knee'
        },
        {
          name: 'Shin'
        }
        ,
        {
          name: 'Ankle'
        }
        ,
        {
          name: 'Foot'
        }
        ,
        {
          name: 'Toe'
        }
      ]
    },
  ]
  backBody: any = [
    {
      mainBody: 'Legs',
      subBody: [
        {
          name: 'Hamstring'
        },
        {
          name: 'Back of knee'
        },
        {
          name: 'Calf'
        },
        {
          name: 'Buttocks'
        },
        {
          name: 'Hip'
        }
      ]
    },
    {
      mainBody: 'Back',
      subBody: [
        {
          name: 'Tailbone'
        },
        {
          name: 'Lower Back'
        },
        {
          name: 'Back'
        },
        {
          name: 'Flank'
        },
        {
          name: 'Upper Back'
        }
      ]
    },
    {
      mainBody: 'Arms',
      subBody: [
        {
          name: 'Shoulder'
        },
        {
          name: 'Upper Arm'
        },
        {
          name: 'Elbow'
        },
        {
          name: 'Forearm'
        }
        ,
        {
          name: 'Wrist'
        }
        ,
        {
          name: 'Hand'
        }
        ,
        {
          name: 'Fingers'
        }
      ]
    },
    {
      mainBody: 'Neck',
      subBody: [
        {
          name: 'Neck'
        }
      ]
    },
    {
      mainBody: 'Head',
      subBody: [
        {
          name: 'Head'
        }
      ]
    }
  ]

  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    let userData = this.appProvider.current.loginData
    console.log(userData)
    let object = this.appProvider.current.checkinAppointment ? this.appProvider.current.checkinAppointment : {}
    this.selectedBody = object.selectedBody ? object.selectedBody : []
    this.ids = object.ids ? object.ids : []
    if (userData.gender == 'Male') {
      this.Gender = true
    } else {
      this.Gender = false
    }
  }

  GenderSide(e: any) {
    console.log(e.target.value);
    if (e.target.value === 'Male') {
      this.Gender = true
    }
    if (e.target.value === 'Female') {
      this.Gender = false
    }
  }

  MaleSide(e: any) {
    console.log(e.target.value);
    if (e.target.value === 'MaleFront') {
      this.MaleAvater = true
    }
    if (e.target.value === 'MaleBack') {
      this.MaleAvater = false
    }
  }

  FemaleSide(e: any) {
    console.log(e.target.value);
    if (e.target.value === 'FemaleFront') {
      this.FemaleAvater = true
    }
    if (e.target.value === 'FemaleBack') {
      this.FemaleAvater = false
    }
  }

  getClassActive(name: any) {
    let calssObject = Object.assign(this.selectedBody)
    let type = this.Gender ? (this.MaleAvater ? 'Front' : 'Back') : (this.FemaleAvater ? 'Front' : 'Back')
    let datavalue = calssObject.filter((it: any) => {
      if (it.subbody == name && it.type == type) {
        return it
      }
    })
    // console.log(datavalue)
    if (datavalue.length > 0) {
      return 'active'
    } else {
      return ''
    }
    //  this.selectedBody.push({
    //   mainboy: mainboy,
    //   subbody: subbody,
    //   id: id,
    //   gender:this.Gender ?'Male':'Female',
    //   type: this.Gender ? (this.MaleAvater ? 'Front' : 'Back') : (this.FemaleAvater ? 'Front' : 'Back')
    // })
  }

  getClass(id: any) {
    let indexData = this.ids.filter((it: any) => {
      // //console.log(it)
      // { 
      //   id:'mouth',
      //   gender:'Male',
      //   side:'front'
      // },
      if (this.Gender) {
        if (this.MaleAvater) {
          if (it.gender == 'Male' && it.side == 'front' && it.id == id) {
            return it
          }
        } else {
          if (it.gender == 'Male' && it.side == 'back' && it.id == id) {
            return it
          }
        }
      } else {
        if (this.FemaleAvater) {
          if (it.gender == 'Female' && it.side == 'front' && it.id == id) {
            return it
          }
        } else {
          if (it.gender == 'Female' && it.side == 'back' && it.id == id) {
            return it
          }
        }
      }
      // return it
    })
    // //console.log(indexData)
    if (indexData.length == 0) {
      return ''
    } else {
      return 'active'
    }
  }

  onPathClick(mainboy: any, subbody: any, id: any) {
    // console.log(mainboy, subbody, id)
    if (id) {
      let uid = ''
      let objectValue = Object.assign([], this.ids)
      let indexData = objectValue.filter((it: any) => {
        // //console.log(indexData,this.ids)
        // { 
        //   id:'mouth',
        //   gender:'Male',
        //   side:'front'
        // },
        if (this.Gender) {
          if (this.MaleAvater) {
            if (it.gender == 'Male' && it.side == 'front' && it.id == id) {
              uid = 'Male_front_' + id
              return it
            }
          } else {
            if (it.gender == 'Male' && it.side == 'back' && it.id == id) {
              uid = 'Male_back_' + id
              return it
            }
          }
        } else {
          if (this.FemaleAvater) {
            if (it.gender == 'Female' && it.side == 'front' && it.id == id) {
              uid = 'Female_front_' + id
              return it
            }
          } else {
            if (it.gender == 'Female' && it.side == 'back' && it.id == id) {
              uid = 'Female_back_' + id
              return it
            }
          }
        }
        // return it
      })
      if (indexData.length == 0) {
        if (this.Gender) {
          if (this.MaleAvater) {
            this.ids.push({
              gender: 'Male',
              side: 'front',
              id: id,
              uniqueId: 'Male_front_' + id
            })
          } else {
            this.ids.push({
              gender: 'Male',
              side: 'back',
              id: id,
              uniqueId: 'Male_back_' + id
            })
          }
        } else {
          if (this.FemaleAvater) {
            this.ids.push({
              gender: 'Female',
              side: 'front',
              id: id,
              uniqueId: 'Female_front_' + id
            })
          } else {
            this.ids.push({
              gender: 'Female',
              side: 'back',
              id: id,
              uniqueId: 'Female_back_' + id
            })
          }
        }
      } else {
        let data = indexData[0]
        // console.log(data)
        // console.log(uid)
        let objectValue = Object.assign([], this.ids)
        let idsLocal = objectValue.filter((it: any) => { return it.uniqueId != uid })
        // console.log(idsLocal)
        this.ids = idsLocal
      }
    }
    // //console.log(id)
    // console.log(this.ids)


    // let indexx = this.selectedBody.map((it: any) => {
    //   return it.subbody
    // }).indexOf(subbody)

    // //console.log(indexx)

    let gender = this.Gender ? 'Male' : 'Female'
    let type = this.Gender ? (this.MaleAvater ? 'Front' : 'Back') : (this.FemaleAvater ? 'Front' : 'Back')
    let uniqueid = mainboy + '_' + subbody + '_' + id + '_' + gender + '_' + type
    let indexData = this.selectedBody.map((it: any) => { return it.uniqueid }).indexOf(uniqueid)

    console.log(indexData)
    if (indexData == -1) {
      this.selectedBody.push({
        mainboy: mainboy,
        subbody: subbody,
        id: id,
        gender: this.Gender ? 'Male' : 'Female',
        uniqueid: uniqueid,
        type: this.Gender ? (this.MaleAvater ? 'Front' : 'Back') : (this.FemaleAvater ? 'Front' : 'Back')
      })
    } else {
      let datavalue = this.selectedBody.filter((it: any) => it.uniqueid != uniqueid)
      this.selectedBody = datavalue
    }

    let object = this.appProvider.current.checkinAppointment ? this.appProvider.current.checkinAppointment : {}
    let obj = {
      selectedBody: this.selectedBody,
      ids: this.ids
    }

    let newObject = Object.assign(object, obj)
    //console.log(newObject)
    localStorage.setItem('healthAppLog', JSON.stringify(newObject));
    this.appProvider.current.checkinAppointment = newObject
    // this.appProvider.current.selectedBody=this.selectedBody
    //console.log(this.selectedBody)

  }

  onSave() {
    if (this.selectedBody.length == 0) {
      this.service.err("Please select body parts")
      return
    }
    this.route.navigate(['/chekin-symptoms'])
  }

}


