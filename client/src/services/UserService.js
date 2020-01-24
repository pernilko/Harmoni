// @flow
import axios from 'axios';
import {Alert} from "../widgets";
import {sharedComponentData} from "react-simplified";
import {Organization, organizationService} from "./OrganizationService";
import {Artist, File} from "./ArtistService";
import { createHashHistory } from 'history';
const history = createHashHistory();

let url: string = "http://localhost:8080/";
/**
    User - Klasse som beskriver en rad i Usertabellen.
 */
export class User {
    user_id: number = -1;
    org_id: number = -1;
    email: string = "";
    privileges: number = -1;
    user_name: string = "";
    password: string = -1;
    address: string = "";
    phone: string = "";
    image: File = null;
    reg_date: string = "";
    p_create_event: number = 0;
    p_read_contract: number = 0;
    p_read_riders: number = 0;
    p_archive: number = 0;

    /*constructor(user_id: number, org_id: number, email: string, privileges: number, user_name: string, password: string, address: string, phone: string, image: string, reg_date: string) {
        this.user_id = user_id;
        this.org_id = org_id;
        this.email = email;
        this.privileges = privileges;
        this.user_name = user_name;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.image = image;
        this.reg_date = reg_date;
    }
     */
}

/**
    UserService - Klassen brukes for å håndtere informasjon tilknytta en bruker.
 */
class UserService {
    currentUser: User;

    /**
        autoLogin - Sjekke om det ligger en gyldig token i localstorage. Om det er tilfellet så refresher den tokenen slik at brukeren er logget inn i en time til.
        @return et JSON-objekt med variablene token, og user_id. Token er tokenen som verifiserer at brukeren er logget inn user_id er id til brukeren som er logga inn.
     */
    autoLogin(){
        console.log("auto-logging in with token from localStorage: " + localStorage.getItem("token"));

        if(localStorage.getItem("token")) {
            if (localStorage.getItem("token").length > 0) {
                return axios < User > ({
                    url: url + 'token',
                    method: 'post',
                    headers: {
                        "x-access-token": localStorage.getItem("token"),
                        "Content-Type": "application/json; charset=utf-8"
                    }
                })
                    .then(response => {
                        if (response.data.jwt) {
                            localStorage.setItem("token", response.data.jwt);
                            console.log("user_id: " + response.data.user_id);
                            this.getUser(response.data.user_id).then(res => {
                                console.log("response from getUser");
                                console.log(res);
                                this.currentUser = res;
                                organizationService.setCurrentOrganization(res.org_id);
                                // history.push("/alleEvents");
                            }).catch((error: Error) => Alert.danger("Ikke autorisert"));
                        }
                        console.log(response.data);
                    }).catch((error:Error) => {
                        localStorage.removeItem("token");
                        this.currentUser = null;
                        Alert.danger("Du har blitt logget ut");
                            history.push("/login");
                    });
            }
        }else if (localStorage.getItem("invToken")) {
            console.log("har invtoken, men ikke token");
        }else{
            history.push("/login");
        }
    }

    /**
        logIn - funksjon for å logge inn på en bruker, tar inn informasjon fra brukeren og returner en token om informasjonen var gyldig.
        @parameter {number} org_id - id til organisasjonen som brukeren skal logge inn hos.
        @parameter {string} email - emailen til brukeren som forsøker å logge inn.
        @parameter {string} password - passordet som brukeren forsøker å logge inn med.
        @return et JSON-objekt med variablene token, og user_id. Token er tokenen som verifiserer at brukeren er logget inn user_id er id til brukeren som er logga inn.
     */
    logIn(org_id: number, email: string, password: string){
        console.log("logging in");
        return axios.post<{}, {jwt: string}>(url+'login', {
            "org_id":org_id,
            "email": email,
            "password": password
        }).then(response=>{
            console.log("got response from server");
            if(response.data.jwt){
                localStorage.setItem("token", response.data.jwt)
                userService.getUser(response.data.user_id).then(res=>{
                    this.currentUser = res;
                    organizationService.setCurrentOrganization(res.org_id);
                    console.log(this.currentUser);
                    history.push("/alleEvents");
                });
            }
        }).catch((error:Error)=>Alert.danger("Feil passord"));
    }

    //for registering a new user
    /**
        register - Legger til en ny bruker i DB.
        @parameter {number} org_id - id til organisasjonen som brukeren skal logge inn hos.
        @parameter {string} email - emailen til brukeren som forsøker å logge inn.
        @parameter {number} privileges - et tall som beskriver om brukeren er en vanlig bruker (0), eller om brukeren er en admin (alle andre tall enn 0).
        @parameter {string} user_name - navnet til brukeren som skal registrere seg.
        @parameter {string} password - passordet som brukeren forsøker å logge inn med.
        @parameter {string} address - addressen til brukeren som skal registrere seg.
        @parameter {string} phone - mobilnummer til brukeren som skal registrere seg.
        @parameter {string} image - google cloud URL til profilbildet til brukeren som skal registrere seg.
        @return antallet rader som ble påvirket av kallet.
     */
    register(org_id: number, email: string, privileges: number, user_name: string, password: string, address: string, phone: string, image: string){
        return axios.post<{}, User>(url+'register',{
            "org_id": org_id,
            "email": email,
            "privileges": privileges,
            "user_name": user_name,
            "password": password,
            "address": address,
            "phone": phone,
            "image": image
        }).then(response=>response.data);
    }

    /**
        addProfilePicture - oppdaterer en bruker sitt profilbilde
        @parameter {number} user_id - Id til brukeren som skal endre bildet sitt.
        @parameter {File} picture - bildet som skal lastet opp til google cloud.
        @return antallet rader som ble påvirket av kallet
     */
    addProfilePicture(user_id: number, picture: File) {
        let fd:FormData = new FormData();
        fd.append("myFile", picture);
        return axios<{}>({
                url: url +'upload/Profile/editImage/'+user_id,
                method: 'put',
                data: fd,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    }

    /**
        updateEmail - Metode for å endre emailen til en bruker
        @parameter {number} user_id - id til brukeren som skal endre sin email.
        @parameter {string} email - den nye emailen til brukeren.
        @return Antallet rader som ble påvirket av kallet.
     */
    updateEmail(user_id: number, email: string){
        return axios.put<{}, User>(url + 'Profile/editEmail/' + user_id,
          {"email": email}) .then(response => response.data);
    }

    /**
        updateEmail - Metode for å endre profilbildet til en bruker
        @parameter {number} user_id - id til brukeren som skal endre sin email.
        @parameter {string} image - det nye bildet til brukeren.
        @return Antallet rader som ble påvirket av kallet.
     */
    updateImage(user_id:number, image:string){
        return axios.put<{}, User>(url + 'Profile/editImage/' + user_id,
          {"image": image}) .then(response => response.data);
    }

    /**
        updateEmail - Metode for å endre adresse og/eller mobilnr til en bruker
        @parameter {number} user_id - id til brukeren som skal endre sin email.
        @parameter {string} adresse - den nye adressen til brukeren.
        @parameter {string} phone - mobilnr til brukeren
        @return Antallet rader som ble påvirket av kallet.
     */
    updateInfo(user_id:number, address:string, phone: string){
        return axios.put<{}, User>(url + 'Profile/editInfo/' + user_id, {
            "address": address,
            "phone": phone
        }) .then(response => response.data);
    }

    /**
        updateEmail - Metode for å endre rettighetene til en bruker til en bruker
        @parameter {number} p_create_event - tallverdi som er større enn 0 om brukeren har lov til å opprette arrangement for en organisasjon.
        @parameter {number} p_read_contract - tallverdi som er større enn 0 om brukeren har lov til å lese kontrakter for organisasjonen.
        @parameter {number} p_read_riders - tallverdi som er større enn 0 om brukeren har lov til å lese rider-avtalene.
        @parameter {number} p_archive - tallverdi som er større enn 0 om brukeren har lov til å arkivere arrangement.
        @return Antallet rader som ble påvirket av kallet.
     */
    updatePrivileges(user_id: number, p_create_event: number, p_read_contract: number, p_read_riders: number, p_archive: number){
        return axios.put<{}, User>(url+ 'user/updatePrivileges/'+ user_id, {
            "p_create_event": p_create_event,
            "p_read_contract": p_read_contract,
            "p_read_riders": p_read_riders,
            "p_archive": p_archive
        }).then(response=>response.data);
    }

    /**
        updateEmail - Metode for å endre brukernavn/passord til en bruker
        @parameter {number} user_id - id til brukeren som skal endre sin email.
        @parameter {string} user_name - det nye navnet til brukeren.
        @parameter {string} password - det nye passordet til brukeren.
        @return Antallet rader som ble påvirket av kallet.
     */
    updateUsernamePassword(user_id:number, user_name: string, password: string){
        return axios.put<{}, User>(url + 'Profile/edit/' + user_id, {
            "user_name": user_name,
            "password": password
        }).then(response => response.data);
    }

    /**
        updateEmail - Metode for å endre navnet til en bruker til en bruker
        @parameter {number} user_id - id til brukeren som skal endre sin email.
        @parameter {string} user_name - det nye brukernavnet til en bruker.
        @return Antallet rader som ble påvirket av kallet.
     */
    updateUserName(user_id: number, user_name: string){
        return axios.put<{}, User>(url + 'Profile/updateUsername/'+ user_id, {
            "user_name": user_name
        }).then(response=>response.data);
    }

    /**
        deleteUser - metode for å slette en bruker.
        @parameter {number} user_id - id til brukeren som skal slettes.
        @return antallet rader som ble påvirket av kallet.
     */
    deleteUser(user_id: number){
        return axios.delete<{}, User>(url + 'user/delete/' + user_id).then(response => response.data);
    }

    /**
        getUser - henter en bruker med en gitt id.
        @parameter {number} user_id - id til brukeren som skal hentes.
        @return User[] raden i Usertabellen til brukeren som ble hentet
     */
    getUser(user_id){
        return axios.get<User>(url+ 'user/'+ user_id).then(response=>response.data[0]);
    }

    /**
        getuserByOrgId - henter alle brukere som er tilknytta en organisasjon.
        @parameter {number} org_id - id til organisasjonen metoden skal hente alle brukerne til.
        @return User[] alle brukerne tilknytta organisasjonen
     */
    getUserByOrgId(org_id: number){
        console.log("ORG_ID: ", org_id)
        return axios.get<User[]>(url +"user/all/"+ org_id).then(response => response.data);
    }

    /**
        resetPass - oppdatere passordet til en bruker
        @parameter {number} org_id - id til organisasjonen som brukeren tilhører.
        @parameter {string} email - eposten til brukeren som skal endre sitt passord.
        @parameter {string} password - det nye passordet til brukeren.
        @return antallet rader som ble påvirket av kallet
     */
    resetPass(org_id: number, email: string, password: string) {
        return axios.put<{}, User>(url + "user/resetPass", {
            "org_id": org_id,
            "email": email,
            "password": password
        }).then(res => res.data);
    }

    /**
        getAdminByOrgId - Henter adminbrukerne til en gitt organisasjon
        @parameter {number} org_id - id til organisasjonen det er snakk om.
        @return User[], liste med Userobjekt som er administratorer i organisasjonen.
     */
    getAdminByOrgId(org_id: number){
        return axios.get<User[]>(url +"user/admin/"+ org_id).then(response => response.data)
    }
    
    /**
        verifiserAdminOgOrg - sender en email til ny admin for å bekrefte den når de har laget en organisasjon. Det sendes med mye informasjon om administratorbrukeren fordi den ikke opprettes før de trykker på lenken, så informasjonen som lager bruker blir kryptert med i lenken.
        @parameter {string} org_name - navnet på organisasjonen.
        @parameter {string} org_email - emailen til organisasjonen selv.
        @parameter {string} org_phone - mobilnummeret til organisasjonen selv.
        @parameter {string} user_email - epostadressen til adminbrukeren som skal motta eposten.
        @parameter {number} user_privileges - et nummer som er større enn 0 dersom brukeren er av typen administrator.
        @parameter {string} user_user_name - navnet til administratorbrukeren.
        @parameter {stirng} user_password - passordet til administratorbrukeren.
        @parameter {string} user_adress - adressen til den nye adminstratorbrukeren.
        @parameter {string} user_phone - mobilnummeret til den nye administratorbrukeren
        @return antallet rader som ble påvirket.
     */
    verifiserAdminOgOrg(org_name: string, org_email: string, org_phone: string, user_email: string, user_privileges, user_user_name, user_password, user_address, user_phone){
        return axios.post<{}>(url+"verifyEmail", {
            "org_name": org_name,
            "org_email": org_email,
            "org_phone": org_phone,
            "user_email": user_email,
            "user_privileges": user_privileges,
            "user_user_name": user_user_name,
            "user_password": user_password,
            "user_address": user_address,
            "user_phone": user_phone
        }).then(res=>res.data);
    }

    /**
        makeAdmin - endrer rettighetene til en bruker 
        @parameter {number} user_id - id til brukeren som skal bli en administrator.
        @return antallet rader som ble påvirket.
     */
    makeAdmin(user_id: number) {
        return axios.put<{}>(url + "user/makeAdmin/"+user_id).then(res => res.data);
    }
}

export let userService: UserService = sharedComponentData(new UserService());

