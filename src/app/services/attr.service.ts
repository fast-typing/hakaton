// import { Injectable, OnInit } from "@angular/core";
// import { CookiesService } from "./cookies.service";
// import { HTTPService } from "./http.service";
// import { Attraction } from "../interfaces/interface";

// @Injectable({
//     providedIn: 'root',
// })

// export class AttrService {
//     public attrs!: Attraction[]
//     public publicAttrs!: Attraction[]
//     public officialAttrs!: Attraction[]
//     public favAttrs!: Attraction[]
//     public mineAttrs!: Attraction[]

//     constructor(
//         private http: HTTPService,
//     ) { 
//         this.http.getAllAttr().subscribe((res) => {
//             console.log(res)
//             this.attrs = res
//             this.publicAttrs = res.filter((item) => item.type == 'От народа')
//             this.officialAttrs = res.filter((item) => item.type == 'Официальный')

//             // this.http.getUserByToken()
//             // this.officialAttr = res.filter((item) => item.type == 'Официальный')
//             // this.officialAttr = res.filter((item) => item.type == 'Официальный')
//         })
//     }
    
// }