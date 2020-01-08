import {LoginCard} from "./Components";
import {User} from "../../services/UserService";

export class Login extends Component{
    user: User= new User();

    render(){
        <LoginCard user = {this.user}>

        </LoginCard>
    }
}