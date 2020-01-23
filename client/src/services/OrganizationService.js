// @flow
import axios from 'axios';
import {Alert} from "../widgets";
import {User} from "./UserService";
import {sharedComponentData} from "react-simplified";

let url: string = "http://localhost:8080/";

/**
 * Hjelpeklasse som stemmer overens med databasetabellen for organisasjoner.
 */
export class Organization {
    org_id: number = -1;
    org_name: string = "";
    phone: string = "";
    email: string = "";
    image: string = "";
    reg_date: string = "";

    /*
    constructor(org_id: number, org_name: string, phone: string, email: string, reg_date: string) {
        this.org_id = org_id;
        this.org_name = org_name;
        this.phone = phone;
        this.email = email;
        this.reg_date = reg_date;
    }

     */


}

/**
 * klasse for organisasjoner som abstraherer requests til serveren.
 */
class OrganizationService{

    currentOrganization: Organization = null;
    //not tested
    /**
     * Metode for å hente alle organisasjoner fra databasen.
     * @returns {boolean} en liste med organisasjoner.
     */
    getAllOrganizations(){
        return axios.get<Organization[]>(url + 'organization').then(response=>response.data);
    }

    /**
     *
     * @param org_id
     * @returns {boolean}
     */
    //not tested
    getOrganization(org_id: number){
        return axios.get<Organization>(url + 'organization/id/'+org_id).then(response=> response.data[0]);
    }

    /**
     * Metode for å hente ut alle organisasjoner en bruker/epostaddresse tilhører.
     * @param email {string} tar inn en epostaddresse tilhørende en eller flere brukere.
     * @returns {boolean} gir tilbake en liste med organisasjoner en epostaddresse tilhører.
     */
    //tested
    getOrganizationByEmail(email: string){
        return axios.get<Organization[]>(url+'organization/mail/'+email).then(response=>response.data);
    }

    /**
     * Metode for å lagre all informasjon om den spesifikke organisasjonen som tilhører innlogget bruker
     * @param org_id {number} tar inn id-en til gjeldende organisasjon.
     */
    setCurrentOrganization(org_id: number){
        this.getOrganization(org_id).then(response=>{
            this.currentOrganization = response;
            console.log("current org: ");
            console.log(this.currentOrganization);
        });
    }

    /**
     * Metode for å sende inn en ny organisasjon til serveren.
     * @param org_name {string} tar inn navnet på den nye organisasjonen.
     * @param phone {string} tar inn telefonnummeret på den nye organisasjonen.
     * @param email {string} tar inn epostaddresse til den nye organisasjonen som skal opprettes.
     */
    //tested
    addOrganization(org_name: string, phone: string, email:string){
        return axios.post<{}, Organization>(url + 'organization/add', {
            "org_name": org_name,
            "phone": phone,
            "email": email
        }).then(response=>response.data);
    }

    /**
     * Metode for å sende en sletterequest av en spesifikk organisasjon til serveren.
     * @param org_id {number} tar inn id-en på gjeldende organisasjon.
     */
    //not tested
    deleteOrganization(org_id: number){
        return axios.delete<{},Organization>(url+ 'organization'+org_id).then(response=>response.data);
    }

    /**
     * Metode for å sjekke om token for inviterte brukere er gyldig.
     * @returns {boolean} gir tilbake informasjon om organisasjonen som skal brukes ved videre registrering.
     */
    checkInvToken(){
        console.log("auto-logging in with token from localStorage: " + localStorage.getItem("invToken"));
        if (localStorage.getItem("invToken")) {
            return axios<User>({
                url: url +'invToken',
                method: 'post',
                headers: {
                    "x-access-token": localStorage.getItem("invToken"),
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(res=>
                res.data
            );
        }else{
            Alert.danger("Mangler token");
        }
    }

    /**
     * Metode for å sende inn token mottatt i url fra epost ved glemt passord, og sjekke om den er gyldig.
     * @returns {boolean} gir tilbake informasjon om brukeren som er nødvendig for å gjenopprette passordet.
     */
    checkResetToken() {
        console.log(localStorage.getItem("resetToken"));
        if (localStorage.getItem("resetToken")) {
            return axios<User>({
                url: url + "resetToken",
                method: "post",
                headers: {
                    "x-access-token": localStorage.getItem("resetToken"),
                    "Content-type": "application/json; charset=utf-8"
                }
            }).then(res => res.data);
        } else {
            Alert.danger("Mangler token");
        }
    }

    /**
     * Metode for å sjekke om mottatt token for verifisering av organisasjon og admin-bruker -registrering er gyldig.
     * @param token {string} tar inn token som skal sjekkes.
     * @returns {Promise<AxiosResponse<any>>} gir tilbake all informasjon bruker skrev inn ved registrering, som brukes til oppretting av admin-bruker og tilkoblet organisasjon.
     */
    checkVerifyToken() {
        return axios({
            url: url + "verifyToken",
            method: "post",
            headers: {
                "x-access-token": localStorage.getItem("invToken"),
                "Content-type": "application/json; charset=utf-8"
            }
        }).then(res=>res.data);
    }

    /**
     * Metode for å sende request til server om å invitere en ny bruker til en organisasjon.
     * @param email {string} tar inn email-addressen invitasjonen skal sendes til.
     * @param org_id {number} tar inn id-en på organisasjonen invitasjonen er fra.
     * @param org_name {string} tar inn navnet på organisasjonen invitasjonen er fra.
     */
    inviteUser(email: string, org_id: number, org_name: string) {
        return axios.post<{}, {}>(url + 'inviteUser', {
            "email": email,
            "org_id": org_id,
            "org_name": org_name
        }).then(response => response.data);
    }

    /**
     * Metode for å sende enn bug-rapport til admin av organisasjonen.
     * @param email {string} tar inn email-addressen bug-rapporten skal sendes til.
     * @param org_id {number} tar inn id-en til gjeldende organisasjonen.
     * @param org_name {string} tar inn navnet på gjeldende organisasjon.
     * @param text {string} tar inn innholdet på bug-rapporten.
     */
    reportBug(email: string, org_id: number, org_name: string, text: string) {
        return axios.post<{}, {}>(url + 'bugreport', {
            "email": email,
            "org_id": org_id,
            "org_name": org_name,
            "text" : text
        }).then(response => response.data);
    }

    /**
     * Metode for å sende email til alle involvert i et event som er avlyst.
     * @param email {string}
     * @param org_id
     * @param org_name
     * @param event_name
     */
    sendCancellationMail(email: string, org_id: number, org_name: string, event_name: string){
        return axios.post<{},{}>(url + "cancelled", {
            "email" : email,
            "org_id": org_id,
            "org_name": org_name,
            "event_name": event_name
        })
    }

    /**
     * Metode for å sende request til serveren om å sende email om glemt passord
     * @param email {string} tar inn email for bruker som har glemt passord
     * @param org_id
     * @param org_name
     */
    forgotPass(email: string, org_id: number, org_name: string) {
        console.log("EMAIL: ", email);
        console.log("ORG_ID: ", org_id);
        console.log("ORG_NAME: ", org_name);
        return axios.post<{}, {}>(url + "forgotPass", {
            "email": email,
            "org_id": org_id,
            "org_name": org_name
        }).then(res => res.data);
    }

    /**
     * Metode for å sende en oppdateringsrequest til serveren og endre informasjon om en spesifikk organisasjon.
     * @param org_id {number} tar inn id-en på organisasjonen som skal redigeres.
     * @param org_name {string} tar inn det nye navnet organisasjonen skal redigeres til.
     * @param phone {string} tar inn det nye telefonnummeret organisasjonen skal ha.
     * @param email {string} tar inn den nye epost-addressen organisasjonen skal ha.
     */
    updateOrganization(org_id: number, org_name: string, phone: string, email: string){
        return axios.put<{}, Organization>(url+'organization/edit/'+org_id, {
            "org_name": org_name,
            "phone": phone,
            "email": email
        }).then(response=>response.data);
    }

    /**
     * Metode som sender update-request til serveren om å endre bilde koblet til en spesifikk organisasjon.
     * @param org_id {number} tar inn id-en på organisasjonen som skal redigeres.
     * @param picture {File} tar inn Filen som skal lastes opp til serveren.
     * @returns {boolean} gir tilbake json formatert affectedRows
     */
    updateOrgImage(org_id: number, picture: File) {
        let fd:FormData = new FormData();
        fd.append("myFile", picture);
        return axios<{}>({
                url: url +'upload/organization/editImage/'+org_id,
                method: 'post',
                data: fd,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    }
}

export let organizationService: OrganizationService = sharedComponentData(new OrganizationService());