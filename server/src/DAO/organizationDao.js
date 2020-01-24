//@flow
const Dao = require("./dao.js");
const imageUrl = "https://storage.cloud.google.com/harmoni-files/";
/**
    organizationDao brukes til å hente informasjon tilknytta organisasjonene
 */
module.exports = class organizationDao extends Dao {
    /**
        henter alle organisasjoner
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    getAllOrganizations(callback: function) {
        super.query(
            "SELECT * FROM organization ", [], callback
        );
    }

    /**
        henter en konkret organisasjon
        @parameter {number} org_id - id til den organisasjonen en henter ut.
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    getOrganization(org_id: number, callback: function) {
        super.query(
            "SELECT * FROM organization WHERE org_id = ?", [org_id],
            callback
        );
    }

    /**
        henter org gitt email
        @parameter {string} email - epostadressen til den organisasjonen en skal hente.
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    getOrgByEmail(email: string, callback: function) {
        super.query(
            "SELECT * FROM organization WHERE email = ?", [email],
            callback
        );
    }

    /**
        henter en organisasjon gitt email til en bruker
        @parameter {string} - eposten til brukeren.
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    getOrgByUserEmail(email: string, callback: function) {
        super.query(
            "SELECT organization.org_id, organization.org_name, organization.email, organization.phone FROM organization JOIN user on( user.org_id = organization.org_id) WHERE user.email = ?",
            [email], callback
        );
    }

    /**
        Legger til en ny organisasjon
        @parameter {string} org_name - navnet til den nye organisasjonen.
        @parameter {string} phone - tlf til den nye organisasjonen.
        @parameter {string} email - epost til den nye organisasjonen.
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    addOrganization(json: {org_name: string, phone: string, email: string}, callback: function) {
        super.query(
            "INSERT INTO organization(org_name, phone, email) VALUES (?,?,?)",
            [json.org_name, json.phone, json.email], callback
        );
    }

    /**
        Sletter en organisasjon gitt id.
        @parameter {number} org_id - id til organisasjonen som skal slettes.
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    deleteOrganization(org_id: number, callback: function){
        super.query(
            "DELETE FROM organization WHERE org_id = ?", [org_id],
            callback
        );
    }

    /**
        Endrer en eksisterende organisasjon gitt org_id.
        @parameter {number} org_id - id til organisasjonen som skal endres.
        @parameter {string} org_name - nye navnet til organisasjonen.
        @parameter {string} phone - nye tlf organisasjonen.
        @parameter {string} email - nye email organisasjonen.
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    updateOrganization(org_id: number,json: { org_name: string, phone: string, email: string}, callback: function){
        super.query(
            "UPDATE organization SET org_name = ?, phone = ?, email = ? WHERE org_id = ?",
            [json.org_name, json.phone, json.email, org_id], callback
        );
    }

    /**
        endrer bildet til en organisasjon
        @parameter {number} org_id - id til organisasjonen som skal endres.
        @parameter {string} image - google cloud adresse til det nye bildet til organisasjonen.
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    updateOrgImage(org_id: number, image: string, callback: function){
        super.query("UPDATE organization SET image=? WHERE org_id=?", [imageUrl + image, org_id], callback);
    }
};
