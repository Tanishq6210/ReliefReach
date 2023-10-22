import "./About.css";
import myImage from './donate.png';
import web3 from 'web3'
export default function Home(){
    
    return (
        <div className="about">
            <div className="home_div">
                <div className="home_left">
                <img src={myImage} alt="Image" height={"550px"} />
                </div>
                <div className="home_right">
                    <h1>Small acts of kindness can create big impacts :) </h1><br></br>
                    <p className="para">In times of crisis and adversity, the act of donating relief funds plays a vital role in alleviating suffering and supporting those in need. These funds are a lifeline for individuals and communities affected by disasters, whether they be natural calamities, humanitarian emergencies, or economic hardships. The generosity of donors enables relief organizations to provide essential resources such as food, clean water, shelter, medical care, and emotional support to those who have been impacted. Donating relief funds is not just an act of charity; it is an expression of solidarity and compassion that brings hope and strength to those facing their darkest hours. It reminds us that, together, we can make a significant difference and help rebuild lives and communities, one contribution at a time.</p>
                    <br></br><br></br>
                </div>
            </div>
        </div>
    );
}