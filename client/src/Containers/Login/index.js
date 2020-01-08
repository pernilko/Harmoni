import {LoginCard} from "./Components";

export class Login extends Component{
    user: User= new User();

    render(){
        <LoginCard user = {this.user}>

        </LoginCard>
    }
}