import "../../styles/AboutUs.css";
import cto from "../../assets/images/fahim.png";
import ceo from "../../assets/images/yonos.jpg";
import cfo from "../../assets/images/riki.jpg";
import cmo from "../../assets/images/sabit.jpg";
import coo from "../../assets/images/mamun.jpg";
import del from "../../assets/images/dell.jpg";
import tan from "../../assets/images/tanvir.jpg";
import say from "../../assets/images/saydol.jpg";

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="title">About Us</h1>
      <p className="description">
        We are a team of passionate individuals committed to delivering the best
        services. Our mission is to inspire and empower our community through
        innovative solutions.
      </p>

      <section className="mission-section">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-description">
          To create a positive impact in the community by providing exceptional
          service and fostering innovation.
        </p>
      </section>

      <section className="values-section">
        <h2 className="section-title">Our Values</h2>
        <ul className="values-list">
          <li>Integrity</li>
          <li>Innovation</li>
          <li>Customer Satisfaction</li>
          <li>Teamwork</li>
        </ul>
      </section>
      <h2 className="section-title">Meet Our Team</h2>
      <div className="team-container">
        <div className="team-member">
          <img src={ceo} alt="Team Member 1" className="member-image" />
          <h3 className="member-name">Dr Mohammad Younus</h3>
          <p className="member-role">CEO</p>
          <p className="member-bio">
            Younus is a visionary leader with over a decade of experience in the
            industry.
          </p>
        </div>
        <div className="team-member">
          <img src={cto} alt="Team Member 2" className="member-image" />
          <h3 className="member-name">Fahim khan</h3>
          <p className="member-role">CTO</p>
          <p className="member-bio">
            Fahim is a tech enthusiast who drives our innovation and technology
            strategy.
          </p>
        </div>

        <div className="team-member">
          <img src={cfo} alt="Team Member 3" className="member-image" />
          <h3 className="member-name">Abu Bakkar Riki</h3>
          <p className="member-role">CFO</p>
          <p className="member-bio">
            Bakkar is a financial strategist with over 15 years of experience in
            managing corporate finances and driving growth.
          </p>
        </div>

        <div className="team-member">
          <img src={coo} alt="Team Member 4" className="member-image" />
          <h3 className="member-name">Abdullah Al mamun</h3>
          <p className="member-role">COO</p>
          <p className="member-bio">
            Mamun oversees operations and ensures efficiency across the
            organization, bringing a wealth of operational expertise.
          </p>
        </div>
        <div className="team-member">
          <img src={tan} alt="Team Member 4" className="member-image" />
          <h3 className="member-name">Tanvir Patwary</h3>
          <p className="member-role">Researcher</p>
          <p className="member-bio">
            Tanvir oversees operations and ensures efficiency across the
            organization, bringing a wealth of operational expertise.
          </p>
        </div>
        <div className="team-member">
          <img src={say} alt="Team Member 4" className="member-image" />
          <h3 className="member-name">Saydol</h3>
          <p className="member-role">Head of Human resourse</p>
          <p className="member-bio">
            Saydol leads the human resources department, ensuring the well-being
            and development of all team members while fostering a productive
            work environment.
          </p>
        </div>

        <div className="team-member">
          <img src={cmo} alt="Team Member 5" className="member-image" />
          <h3 className="member-name">Sabit Khan</h3>
          <p className="member-role">CMO</p>
          <p className="member-bio">
            Sabit is a creative marketing leader focused on brand strategy and
            customer engagement.
          </p>
        </div>
        <div className="team-member">
          <img src={del} alt="Team Member 5" className="member-image" />
          <h3 className="member-name">Delwar Khan</h3>
          <p className="member-role">Child activitist</p>
          <p className="member-bio">
            Delwar is a creative marketing leader focused on brand strategy and
            customer engagement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
