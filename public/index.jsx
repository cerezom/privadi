import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../components/header";
import facebook from "../assets/images/Facebook.svg";
import twitter from "../assets/images/Twitter.svg";
import linkedin from "../assets/images/Linkedin.svg";
import myimg from "../assets/images/myimg.jpg";
import info from "../assets/images/info.svg";
import tokenomicsIcon from "../assets/images/token-img.svg";
import rewardIcon from "../assets/images/reward.svg";
import spearkerIcon from "../assets/images/speaker.svg";
import treasuryIcon from "../assets/images/treasury.svg";
import questionMarkIcon from "../assets/images/question-mark.svg";
import nftIcon from "../assets/images/nft-icon.svg";
import distributeIcon from "../assets/images/distribute.svg";
import discordIcon from "../assets/images/discord.svg";
import redditIcon from "../assets/images/reddit.svg";
import instagramIcon from "../assets/images/instagram.svg";
import mediumIcon from "../assets/images/medium.svg";
import tiktokIcon from "../assets/images/tiktok.svg";
import cryptoHedgingIcon from "../assets/images/Crypto-hedging.svg";
import rewardChart from "../assets/images/rewardChart.svg";
import pierce from "../assets/images/advisory-board/dustin-pierce.jpeg";
import neil from "../assets/images/advisory-board/neil-singh.jpeg";
import finish from "../assets/images/Finish.svg";
import dropdownArrow from "../assets/images/dropdown-arrow.svg";
import fullGlobe from "../assets/images/f.svg";
import tokenchart from "../assets/images/tokenchart.svg";
import cube from "../assets/images/cube.svg";
import cube2 from "../assets/images/cubes.svg";
import celine from "../assets/images/team-members/Celine.jpg"
import danish from "../assets/images/team-members/Danish.jpg"
import deborah from "../assets/images/team-members/Deborah.JPG"
import mark from "../assets/images/team-members/Mark.jpg"
import raphael from "../assets/images/team-members/Raphael.jpg"
import vlasta from "../assets/images/team-members/Vlasta.jpg"
import Hayato from "../assets/images/team-members/Hayato.png"
import ayio from "../assets/images/team-members/ayio.jpg"
import { ReactComponent as PractSvg } from "../assets/images/practice.svg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../assets/style/homeStyle.css";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import "./animate.css";
import ScrollAnimation from "react-animate-on-scroll";
import Tooltip from "@material-ui/core/Tooltip";
import priorityIcon from "../assets/images/high-priority-svgrepo-com.svg";
import Zoom from "@material-ui/core/Zoom";
import Alert from "@material-ui/lab/Alert";
import Collapse from '@material-ui/core/Collapse';
import useOnClickOutside from "../helper-functions/use-onclick-outside";
import useStyles from "../components/useStyle";
import tokenchart1 from "../assets/images/tokenchart1.svg";


export default function Home() {
  const [isResponsiveButton, setResponsiveButton] = useState("false");
  const [isResponsiveNavBar, setResponsiveNavBar] = useState("false");
  const [menuDropdown, setMenuDropdown] = useState("false");
  const [language, setLanguage] = useState("EN");
  const [headerEmail, setHeaderEmail] = useState(null);
  const [footerEmail, setFooterEmail] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [footerInputValue, setFootertInputValue] = useState("");
  const api = "https://backend.crypto528.com";
  const baseURL = `${api}/api/v1/submitEmail`;
  const [postContent, setPostContent] = useState(null);
  const [postFooterContent, setPostFooterContent] = useState(null);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [openFooterTooltip, setOpenFooterTooltip] = useState(false);
  const topSubmitRef = useRef()
  const footerSubmitRef = useRef()
  const [openAlert, setOpenAlert] = useState(false);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  
  const handleNavBarResponsiveness = () => {
    setResponsiveButton(!isResponsiveButton);
    setResponsiveNavBar(!isResponsiveNavBar);
  };

  const handleMenudropdown = () => {
    let langList = document.getElementsByClassName("language-list")[0];
    langList.classList.toggle("dropdown");
  };

  const handleLanguage = (e) => {
    e.preventDefault();
    setLanguage(e.target.innerText);
    let langDropdown = document.getElementsByClassName("dropdown")[0];
    if (langDropdown) {
      langDropdown.classList.remove("dropdown");
    }
    let mobilenav = document.querySelector('.topresponsive ')
    if (mobilenav) {
      mobilenav.className = 'topnav';
      document.querySelector('.hamburger').click()
    }
  };
  const scrollIntoView = (e) => {
    e.preventDefault();
    let yOffset;
    let id = e.target.getAttribute("href");
    if (document.querySelector(".sticky")) {
      yOffset = -(document.querySelector("#sticky-header").offsetHeight / 2);
    } else {
      yOffset = -document.querySelector("#sticky-header").offsetHeight - 20;
    }
    const element = document.querySelector(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    let mobilenav = document.querySelector('.topresponsive ')
    if (mobilenav) {
      mobilenav.className = 'topnav';
      document.querySelector('.hamburger').click()
    }
  };

  function handleEmailCollector(position) {
    let email = (position === "header") ? headerEmail : footerEmail

    if (!email) {
      if (position === "header") {
        setOpenTooltip(true);
        setPostContent('Please fill out this field');
      }
      if (position === "footer") {
        setOpenFooterTooltip(true);
        setPostFooterContent('Please fill out this field');
      }
      return;
    }

    if (email && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      if (position === "header") {
        setOpenTooltip(true);
        setPostContent(`Please enter a valid email address. ${email} is not a valid email address`);
      }
      if (position === "footer") {
        setOpenFooterTooltip(true);
        setPostFooterContent(`Please enter a valid email address. ${email} is not a valid email address`);
      }
      return;
    }
    axios
      .post(baseURL, { email })
      .then((response) => {

        if (position === "header") {
          setPostContent(response.data.message);
          setOpenTooltip(true);
          setHeaderEmail(null);
          setInputValue("");

        }
        if (position === "footer") {
          setPostFooterContent(response.data.message);
          setOpenFooterTooltip(true);
          setFooterEmail(null);
          setFootertInputValue("");
        }
      })
      .catch((error) => {

      });
  }

  useOnClickOutside(topSubmitRef, () => {
    setOpenTooltip(false)
  });
  useOnClickOutside(footerSubmitRef, () => {
    setOpenFooterTooltip(false)
  });


  let classes = useStyles();

  return (
    <ParallaxProvider>
      <Header>
        <button
          className={isResponsiveButton ? "hamburger " : "hamburger change"}
          onClick={handleNavBarResponsiveness}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
        </button>
        <nav
          className={isResponsiveNavBar ? "topnav" : "topresponsive "}
          id="topnav"
        >
          <a href="#home-content" onClick={scrollIntoView}>
            Overview
          </a>
          <a href="#home-content" onClick={scrollIntoView}>
            NFT
            Market Place
          </a>
          <a href="#token-economics" onClick={scrollIntoView}>
            Ecosystem
          </a>
          <a href="#rewards" onClick={scrollIntoView}>
            About Us
          </a>
          <a href="#tokenomics" onClick={scrollIntoView}>
            Tokenomics
          </a>
          <div className="language-dropdown">
            <div className="language-title" onClick={handleMenudropdown}>
              <span>Doc</span>
              <img
                src={dropdownArrow}
                alt="drop down arrow"
                className="lang-dropdown" />
            </div>
            <div className="language-list">
              <a href="#" onClick={handleLanguage}>
                WhitePaper
              </a>
              <a href="#" onClick={handleLanguage}>
              Constitution
              </a>
              <a href="#" onClick={handleLanguage}>
              Project KYC Certificate
              </a>
              <a href="#" onClick={handleLanguage}>
              Certificate of Incorporation
              </a>
              </div>
                </div>
          
          <div className="language-dropdown">
            <div className="language-title" onClick={handleMenudropdown}>
              <span>{language} </span>
              <img
                src={dropdownArrow}
                alt="drop down arrow"
                className="lang-dropdown" />
            </div>
            <div className="language-list">
              <a href="#" onClick={handleLanguage}>
                ES
              </a>
              {/* <a href="#" onClick={handleLanguage}>CH</a>
          <a href="#" onClick={handleLanguage}>AR</a> */}
            </div>
          </div>
        </nav>
        {/* <div className="cryptolink">
              <a href="#" className="connect">Connect Wallet </a>
              <a href="#" className="buy">But Token</a>
          </div> */}
        {/* <div className="social-contact">
                  <a href="#"><img src={facebook} alt="facebook" className="social-icon" /></a>
                  <a href="#"><img src={twitter} alt="twitter" className="social-icon" /></a>
                  <a href="#"><img src={linkedin} alt="linkedin" className="social-icon" /></a>
                  <a href="#"><img src={instagramIcon} alt="instagram" className="social-icon" /></a>
                  <a href="#"><img src={redditIcon} alt="reddit" className="social-icon" /></a>
                  <a href="#"><img src={mediumIcon} alt="medium" className="social-icon" /></a>
                  <a href="#"><img src={discordIcon} alt="discord" className="social-icon" /></a>
                  <a href="#"><img src={tiktokIcon} alt="tiktok" className="social-icon" /></a>
              </div> */}
      </Header>
      <br />
      <section id="home-content">
        <div id="top-subscribe">
          <div className="subscribe">
            <br />
            <br />
            <Tooltip
              open={openTooltip}
              classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
              TransitionComponent={Zoom}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={<>
                <div
              className="tooltip-container"><img src={priorityIcon} alt="priority icon" /><p>{postContent}</p></div>
              </>}
              placement="bottom-start" arrow
            >
              <input
                type="text"
                placeholder="Enter email for project updates"
                value={inputValue}
                onChange={e => {
                  setHeaderEmail(e.target.value);
                  setInputValue(e.target.value);
                } }
              />
            </Tooltip>
            <button ref={topSubmitRef} onClick={() => handleEmailCollector("header")}>Subscribe</button>
            <br />
            <br />
          </div>
        </div>
        <div className="social-contact top-social">
          <a
            href="https://www.facebook.com/Crypto528DAO/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="facebook" className="social-icon" />
          </a>
          <a
            href="https://twitter.com/crypto528dao?s=21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitter} alt="twitter" className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/mwlite/company/crypto528dao"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="linkedin" className="social-icon" />
          </a>
          <a
            href="https://instagram.com/crypto528dao?utm_medium=copy_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagramIcon}
              alt="instagram"
              className="social-icon" />
          </a>
          <a
            href="https://www.reddit.com/user/Crypto528DAO/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={redditIcon} alt="reddit" className="social-icon" />
          </a>
          <a
            href="https://medium.com/@Crypto528DAO"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={mediumIcon} alt="medium" className="social-icon" />
          </a>
          <a
            href="https://vm.tiktok.com/ZMNjFXCsr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={tiktokIcon} alt="tiktok" className="social-icon" />
          </a>
          <a
            href="https://discord.gg/WYfAxsNz2h"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={discordIcon} alt="discord" className="social-icon" />
          </a>
        </div>
        <br />
        <br />
        <Carousel
          infiniteLoop
          useKeyboardArrows
          autoPlay
          stopOnHover={false}
          interval={10000}
          transitionTime={1000}
          animationHandler={"fade"}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
        >
          <div key="content-1" className="flexme">
            <div className="home-content">
              <h2>Welcome to Crypto528 DAO Republik!</h2>
              <p>A crypto Republik made by the people...for the people</p>
              <img src={fullGlobe} alt="" className="small-scr-img" />
            </div>
            <div className="dod">
              <img src={fullGlobe} alt="" />
            </div>
          </div>
          <div key="content-2" className="flexme">
            <div className="home-content">
              <h2>
                Operate a Crypto Mine
              </h2>
              <p>
                Be Part of a DAO Community that Operates a Crypto Mine
              </p>
              <img src={cube} alt="" className="small-scr-img" />
            </div>
            <div className="dod">
              <img src={cube} alt="" />
            </div>
          </div>
          <div key="content-3" className="flexme">
            <div className="home-content">
              <h2>
                Staking Rewards in BTC & USDC
              </h2>
              <p>Receive Monthly Staking Rewards in Your Wallet</p>
              <img src={cube2} alt="" className="small-scr-img" />
            </div>
            <div className="dod">
              <img src={cube2} alt="" />
            </div>
          </div>
        </Carousel>
      </section>
      <br />
      <br />
    <section className="token-economics" id="token-economics">
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="slideOutUp"
          duration={1}
        >
          <br />
          <br />
          <h2 className="token-economics-title">
            <span className="orange">Crypto528</span> Ecosystem
          </h2>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn">
          <p className="token-economics-content">
            The Crypto 528 DAO Republik has a unique token economy which tokenizes cryptocurrency asset purchases along with providing access
            to cryptocurrency mining. Tokenholders are rewarded for staking their C-528 tokens through receiving monthly Bitcoin or USD Coin
            paid to their wallets. Operating as a DAO, the community is run by a governance board that is elected by C-528 tokenholders

          </p>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="zoomInDown"
          animateOut="zoomOutUp"
          duration={1.7}
        >
          <div className="tiles">
            <div className="tiles-card">
              <img className="card-icon " src={tokenomicsIcon} />
              <p className="card-title">Crypto Asset Purchases</p>
              <p className="card-content">
                Crypto528 will use resources in the community treasury to purchase
                cryptocurrencies if approved by the DAO

              </p>
            </div>
            <div className="tiles-card">
              <img className="card-icon " src={rewardIcon} alt="" />
              <p className="card-title">Cryptocurrency Mining</p>
              <p className="card-content">
                The Crypto528 Republik will propose to use some of the DAO treasury resources
                to construct a scalable cryptocurrency mine in the country of Paraguay

              </p>
            </div>
            <div className="tiles-card">
              <img className="card-icon " src={cryptoHedgingIcon} alt="" />
              <p className="card-title">Staking Rewards</p>
              <p className="card-content">
                All C-528 tokenholders that participate in staking will
                receive monthly BTC or USDC rewards paid to the wallet of their choosing
              </p>
            </div>
            <div className="tiles-card">
              <img className="card-icon " src={treasuryIcon} alt="" />
              <p className="card-title">Treasury</p>
              <p className="card-content">
                Crypto528 will hold all resources in a community owned treasury that can only
                be accessed with a vote done by C-528 tokenholders
              </p>
            </div>
            <div className="tiles-card">
              <img className="card-icon " src={distributeIcon} alt="" />
              <p className="card-title">
                Deflationary
              </p>
              <p className="card-content">
                The DAO will propose to use 5% of any monthly rewards that are distributed to buyback and burn (remove) C-528 tokens from the total token supply
              </p>
            </div>
            <div className="tiles-card">
              <img className="card-icon " src={questionMarkIcon} alt="" />
              <p className="card-title">Global Charity Initiatives</p>
              <p className="card-content">
                Crypto528 will donate 5% of the C-528 token supply to various charities that are approved by the DAO
              </p>
            </div>
            <div className="tiles-card">
              <img className="card-icon " src={spearkerIcon} alt="" />
              <p className="card-title">Governance Board</p>
              <p className="card-content">
                Every four years the Crypto528 DAO Republik will hold elections where C-528 tokenholders can vote to elect 10 representatives to the
                governance board. Governance board members will be responsible for managing the DAO operations, expansion strategy and vision
              </p>
            </div>
            <div className="tiles-card">
              <img className="card-icon " src={nftIcon} alt="" />
              <p className="card-title">Environmental, Social & Governance (ESG)</p>
              <p className="card-content">
                Crypto528's approach to Environment, Social and Governance (ESG)
                is guided by the United Nations Sustainable Development Goals (UNSDG)
              </p>
            </div>
            <div className="tiles-card">
              <img className="card-icon " src={nftIcon} alt="" />
              <p className="card-title">Artificial Intelligence (AI)</p>
              <p className="card-content">
              The Republik will set up an artificial intelligence neural network named Samantha which will be at the service of its citizens. Thanks to its machine learning and deep learning protocols, Samantha will scan the order flow of crypto assets and will select, based on risk and performance ratios, the ones with the highest risk rewards ratios
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </section><section id="rewards">
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="slideOutUp"
          duration={1}
        >
          <h2>
            <span className="orange">Staking </span>Rewards
          </h2>
        </ScrollAnimation>
        <p className="reward-content">All C-528 tokenholders that participate in staking will receive monthly BTC or USDC rewards paid to the wallet of their choosing</p>
        <ScrollAnimation animateIn="zoomIn" animateOut="zoomOut" duration={1.7}>
          <div className="reward-chart">
            <img src={rewardChart} alt="" />
          </div>
        </ScrollAnimation>
      </section><section className="road-map" id="road-map">
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="slideOutUp"
          duration={1}
        >
          <h2 className="road-map-title">
            <span className="orange">Road</span>map
          </h2>
        </ScrollAnimation>
        <p className="road-map-content">
          With help from our teams, contributors
          and investors these are the milestones we are looking forward to
          achieve.
        </p>
        <div className="road-map-svg">
          <PractSvg></PractSvg>
          <div className="tiles-card pos-absolute pos-1 ">
            <img className="fl-right" src={finish} alt="" />
            <p className="card-title">Q3 2022</p>
            <div className="card-content">
              <ul>
                <li>Pre-ICO</li>
                <li>ICO</li>
                <li>IDO</li>
              </ul>
            </div>

          </div>
          <div className="tiles-card pos-absolute pos-2">
            <img className="fl-right" src={finish} alt="" />
            <p className="card-title">Q4 2022</p>
            <div className="card-content">
              <ul>
                <li>Governance token is issued </li>
                <li>Crypto mine begins operation</li>
                <li>Major exchange listing 1</li>
              </ul>
            </div>
          </div>
          <div className="tiles-card pos-absolute pos-3">
            <img className="fl-right" src={finish} alt=""/>
            <p className="card-title">Q1 2023</p>
            <div className="card-content">
              <ul>
                <li>Major exchange listing 2</li>
                <li>Build brand awareness</li>
                <li>Assess mine for improvements</li>
              </ul>
            </div>
          </div>
          <div className="tiles-card pos-absolute pos-4">
            <img className="fl-right" src={finish} alt="" />
            <p className="card-title">Q2 2023</p>
            <div className="card-content">
              <ul>
                <li>Major exchange listing 3</li>
                <li>Launch series A for additional fundraising</li>
                <li>Crypto 528 major collab/partnership and begin construction of 10MW mine</li>
                <li>Metaverse project announcement</li>
              </ul>
            </div>
          </div>
        </div>
      </section><section className="tokenomics" id="tokenomics">
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="slideOutUp"
          duration={1}
        >
          <h2 className="tokenomics-title"> <span className="orange">Crypto528</span> Tokenomics</h2>
        </ScrollAnimation>
        <p className="tokenomics-content">
          Crypto 528 DAO Republik will have a total token supply of 250,000,000 which will be released in various
          stages and series. Of the total token supply 5% will be donated equally to various different charities.
          Project founding team tokens will be vested over a period of 4 years
        </p>
        <div className="tokenomics-charts">
          <ScrollAnimation
            animateIn="zoomInDown"
            animateOut="zoomOutUp"
            duration={1.7}
            >
          </ScrollAnimation>
            {/* <div className="tokenomics-card">
<table>
<tbody>
  <tr>
    <th className="orange"></th>
    <td>Private sale</td>
    <td>Seed round</td>
    <td>1st round</td>
    <td>2nd round</td>
    <td>ICO</td>
  </tr>
  <tr>
    <th>Token Price</th>
    <td>$0.005</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <th>Token Release</th>
    <td>13,200,000</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <th>Soft Cap</th>
    <td>$66,000</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <th>Hard Cap</th>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <th>Reward Yield by Rounds</th>
    <td>501%</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
</tbody>
</table>
</div> */}
          <ScrollAnimation
            animateIn="zoomInDown"
            animateOut="zoomOutUp"
            duration={1.7}
          >
            <img src={tokenchart} alt="" className="tokenomics-piechart" />
          </ScrollAnimation>
        </div>
        <br />
            <h2 className="tokenchart1"> <span className="orange">Use of </span> Proceeds</h2>
          <ScrollAnimation 
          animateIn="zoomIn" animateOut="zoomOut" duration={1.7}>
          <div className="tokenchart1">
            <img src={tokenchart1} alt="" />
          </div>
      </ScrollAnimation>
      </section><section className="Our-team" id="Our-team">
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="slideOutUp"
          duration={1}
        >
          <h2 className="tokenomics-title"> <span className="orange">Our</span> Team</h2>
        </ScrollAnimation>
        <p className="our-team-content">
        The Crypto528 Team combines a passion for esports, industry experise & proven record in finance, development, marketing & licensing.
        </p>
    </section>
      <h2>
        <span className="orange1"> THE PROJECT</span> TEAM
      </h2>
      <div className="members">
        <div className="member-card">
          <img src={deborah} alt="Deborah Akiara" className="profile-img" />
          <p className="member-name orange">Deborah Akiara</p>
          <p className="member-title">Co-founder</p>
          <div className="member-social-acct ">
            <a href="https://www.linkedin.com/in/deborah-akiara-ab55051a8" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="linkedin logo" />
            </a>
            <a href="https://twitter.com/debbieakiara?s=21&t=f3Liah3oLoSQ9udgJbBDhA" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="twitter logo" />
            </a>
          </div>
        </div>
        <div className="member-card">
          <img src={vlasta} alt="Vlastimil Hynek" className="profile-img" />
          <p className="member-name orange">Vlastimil Hynek</p>
          <p className="member-title">Co-founder</p>
          <div className="member-social-acct">
            <a href="https://www.instagram.com/vlasta_hynek/?hl=en" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="linkedin logo" />
            </a>
            {/* <a href="#" target="_blank" rel="noopener noreferrer">
<img src={twitter} alt="" />
</a> */}
          </div>
        </div>
        <div className="member-card">
          <img src={raphael} alt="Raphael Comte" className="profile-img" />
          <p className="member-name orange">Raphael Comte</p>
          <p className="member-title">Co-founder</p>
          <div className="member-social-acct">
            <a href="https://www.linkedin.com/in/raphaël-haroun-c-5463a516b/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="linkedin logo" />
            </a>
            {/* <a href="#" target="_blank" rel="noopener noreferrer">
<img src={twitter} alt="" />
</a> */}
          </div>
        </div>
        <div className="member-card">
          <button type="button">
            <img src={info} alt="" />
          </button>
          <img src={danish} alt="Danish Akhtar" className="profile-img" />
          <p className="member-name orange">Danish Akhtar</p>
          <p className="member-title">Co-founder</p>
          <div className="member-social-acct">
            {/* <a href="#" target="_blank" rel="noopener noreferrer">
<img src={facebook} alt="facebook logo" />
</a> */}
            {/* <a href="" target="_blank" rel="noopener noreferrer">
<img src={twitter} alt="twitter logo" />
</a> */}
            <a href="https://www.linkedin.com/in/danish-akhtar-bitcoin-mining-expert-58763bb2/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="linkedin logo" />
            </a>
          </div>
        </div>
        <div className="member-card">
          <img src={mark} alt="Mark Magliocco" className="profile-img" />
          <p className="member-name orange">Mark Magliocco</p>
          <p className="member-title">Co-founder</p>
          <div className="member-social-acct">
            <a href="https://www.linkedin.com/in/mark-magliocco-51185b69/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="linkedin logo" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="" />
            </a>
          </div>
        </div>
        <div className="member-card">
          <img src={Hayato} alt="Hayato Suzuki" className="profile-img" />
          <p className="member-name orange">Hayato Suzuki</p>
          <p className="member-title">Project Leader</p>
          <div className="member-social-acct">
            <a href="https://www.linkedin.com/in/hayatosuzuki801293/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="linkedin logo" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="" />
            </a>
          </div>
        </div>
        <div className="member-card">
          <img src={ayio} alt="Ayiolely Lurogho" className="profile-img" />
          <p className="member-name orange"> Ayoleyi Lurogho</p>
          <p className="member-title">Project Leader</p>
          <div className="member-social-acct">
            <a href="https://www.linkedin.com/in/hayatosuzuki801293/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="linkedin logo" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="" />
            </a>
          </div>
        </div>
      </div>
      
      <br></br>
      <br></br>
      <h3><span className="orange1"> THE 
      ADVISORY</span> BOARD</h3>
        <div className="members">
          <div className="member-card">
            <button type="button">
              <img src={info} alt="" />
            </button>
            <img
              src={neil}
              alt=""
              className="profile-img" />
            <p className="member-name orange">Neil Singh</p>
            <div className="member-info">
              <p className="member-title">Governance Board Supervisor </p>
              <div className="member-social-acct">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src={facebook} alt="" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src={twitter} alt="" />
                </a>
                <a
                  href="https://www.linkedin.com/in/neil-singh-32852320/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedin} alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="member-card">
            <img
              src={pierce}
              alt=""
              className="profile-img" />
            <p className="member-name orange">Dustin Pierce, CFA </p>
            <div className="member-info">
              <p className="member-title">Governance Board Investment Advisor</p>
              <div className="member-social-acct">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src={facebook} alt="" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src={twitter} alt="" />
                </a>
                <a
                  href="https://www.linkedin.com/in/dustin-pierce-cfa-56a38729/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedin} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      <section className="FAQs" id="FAQs">
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="slideOutUp"
          duration={1}
        ><h2>
            <span className="orange">FAQs</span>
          </h2>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="zoomInUp"
          animateOut="zoomOutUp"
          duration={1.5}
        ></ScrollAnimation>
        <div> 
          <Carousel breakPoints={breakPoints}>
          <div className="members">
        <div className="member-card">
          <p><h3><b>What is the purpose of Crypto528?</b></h3>
          The mission of Crypto528 is to bring positive change to the world by creating a community of like-minded individuals with a focus on supporting blockchain technology, sustainable development, human rights, and helping those in need.
</p>
          </div>
          </div>
          <div className="members">
        <div className="member-card">
          <p><h3><b>What is a DAO?</b></h3>
          A Decentralized Autonomous Organization (DAO) is a community-based organization that is collectively owned and managed by its members. DAOs have built-in treasuries so no one has the authority to access funds without the approval of the group. Decisions are governed by proposals and voting to ensure everyone in the organization has a voice. Every decision and transaction is transparent, and the rules around spending the organization’s money are coded directly into smart contracts which are unable to be altered. All major company decisions are made by tokenholders, creating a strong sense of community and project ownership.
</p>
          </div>
          </div>
          <div className="members">
        <div className="member-card">
          <p><h3><b>What is a Crypto Republik?</b></h3>
          A crypto republic is a decentralized blockchain society that has an official set of rules such as a Constitution, which is specifically designed to protect the rights of each individual Citizen. In the Crypto528 Republik, Citizens can elect Chancellors to represent them on the DAO governance board which is known as the 528 Order. By encoding the rights of Citizens into  smart contracts, the power of the society always remains in the hands of its people.
</p>
          </div>
          </div>
          <div className="members">
        <div className="member-card">
          <p><h3><b>Who are Citizens of the Crypto Republik?</b></h3>
          Citizens of the Republik are C-528 tokenholders and are  responsible for safeguarding the community vault and for electing representatives to the 528 Order. The role of Citizens is also to ensure that the Republik and the 528 Order is adhering to the constitution. Governance in the DAO is designed to give Citizens the ability to change, modify or revoke any aspect of the organization ensuring that all power remains in the hands of tokenholders.
</p>
          </div>
          </div>
          <div className="members">
        <div className="member-card">
          <p><h3><b>What is the 528 Order?</b></h3>
          Every four years the Republik will hold elections, where Citizens can cast votes to elect eight Chancellors and one Overseer to create the 528 Order. The primary function of the 528 Order is to act as a governance board that manages and guides the Republik. This is accomplished through the use of voting proposals that are submitted by Chancellors to the 528 Order. 
      </p>
          </div>
          </div>
          <div className="members">
        <div className="member-card">
          <p><h3><b>What does a Chancellor do?</b></h3>
          A Decentralized Autonomous Organization (DAO) is a community-based organization that is collectively owned and managed by its members. DAOs have built-in treasuries so no one has the authority to access funds without the approval of the group. Decisions are governed by proposals and voting to ensure everyone in the organization has a voice. Every decision and transaction is transparent, and the rules around spending the organization’s money are coded directly into smart contracts which are unable to be altered. All major company decisions are made by tokenholders, creating a strong sense of community and project ownership.
      </p>
      </div>
          </div>
          <div className="members">
        <div className="member-card">
          <p><h3><b>Who is the Overseer?</b></h3>
          The Overseer (O-528 holder) is an independent citizen representative that oversees the 528 Order. Unlike Chancellors (G-528 holders), the Overseer does not have any voting rights in the 528 Order. The role of the Overseer is to ensure that all voting proposals submitted are adhering to the Crypto528 constitution and bylaws.
      </p>
      </div>
          </div>
          <div className="members">
        <div className="member-card">
          <p><h3><b>What is a Republik Vault?</b></h3>
          All assets of the DAO are held in the Republik Vault which can only be accessed through voting proposals that are sent to Citizens for approval. Any vote requesting access to the Vault must have a minimum quorum of 5% of total C-528 tokenholders present. If 60% of those C-528 holders who are participating vote in favor, the proposal will pass and be approved for action.
      </p>
      </div>
          </div>
        </Carousel>
      </div>
      { <section className="white-paper" id="white-paper">
<ScrollAnimation
animateIn="slideInUp"
animateOut="slideOutUp"
duration={1}
>
<h2 className="white-paper-title">
<span className="orange">WhitePaper</span> 
</h2>
</ScrollAnimation>
<p className="white-paper-content">
<b>Please see our Whitepaper below</b> 
</p>
<div className="pdf-container">
<div className="pdf-download bg-white">
<a href="https://docs.crypto528.com/" target="_blank" rel="noopener noreferrer">
  <p>View</p>
  <b>
    <p>WhitePaper</p>
  </b>
</a>
</div>
</div>
        
        <h4>
          {/*<span className="orange">PROJECT</span> SPONSORS
</h4>
<div className="members">
<div className="member-card">
<button type="button">
  <img src={info} alt="" />
</button>
<img src={profileImg} alt="" className= "profile-img" />
<p className="member-name orange">Ayoleyi Lurogho</p>
<p className="member-title">CEO & Lead Blockchain Crypto528</p>
<div className="member-social-acct fl-right">
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src={facebook} alt="" />
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src={twitter} alt="" />
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src={linkedin} alt="" />
  </a>
</div>
</div>
<div className="member-card">
<img src={myimg} alt="" className="profile-img" />
<p className="member-name orange">Ayoleyi Lurogho</p>
<p className="member-title">CEO & Lead Blockchain Crypto528</p>
<div className="member-social-acct fl-right">
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src={facebook} alt="" />
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src={twitter} alt="" />
  </a>
</div>
</div>
<div className="member-card">
<img src={myimg} alt="" className="profile-img" />
<p className="member-name orange">Ayoleyi Lurogho</p>
<p className="member-title">CEO & Lead Blockchain Crypto528</p>
<div className="member-social-acct fl-right">
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src={facebook} alt="" />
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src={twitter} alt="" />
  </a>
</div>
</div>
<div className="member-card">
<img src={myimg} alt="" className="profile-img" />
<p className="member-name orange">Ayoleyi Lurogho</p>
<p className="member-title">
  CEO & Lead Blockchain <br /> Crypto528
</p>
<div className="member-social-acct fl-right">
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src={facebook} alt="" />
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src={twitter} alt="" />
  </a>
</div>
</div>
</div>
</section>
{ <section className="white-paper" id="white-paper">
<ScrollAnimation
animateIn="slideInUp"
animateOut="slideOutUp"
duration={1}
>
<h2 className="white-paper-title">
<span className="orange">White</span> Paper
</h2>
</ScrollAnimation>
<p className="white-paper-content">
Please see our Whitepaper below
</p>
<div className="pdf-container">
<div className="pdf-download bg-white">
<a href="https://docs.crypto528.com/" target="_blank" rel="noopener noreferrer">
  <p>View</p>
  <b>
    <p>White Paper</p>
  </b>
</a>
</div>
</div>
<div className="carousel-wrapper" style={{}}>
<Carousel infiniteLoop useKeyboardArrows autoPlay stopOnHover interval={5000} animationHandler={"fade"} showStatus={false} showThumbs={false}>
<div className="carousel-body">
<p className="orange carousel-title">Notices</p>
<p className="carousel-content">
  You may not participate in this program if you are an employee or
  family member of an employee, or a current vendor or employee of
  such vendor, of Endurance of any of its subsidiaries. [You are
  also prohibited from participating if you are (i) in a country or
  territory that is the target of U.S. sanctions (including Cuba,
  Iran, Syria, North Korea, or the Crimea region of Ukraine), (ii)
  designated as a Specially Designated National or Blocked Person by
  the U.S. Department of the Treasury’s Office of Foreign Assets
  Control or otherwise owned, controlled, or acting on behalf of
  such a person or entity, or (iii) otherwise a prohibited party
  under U.S. trade and export control laws.]
</p>

</div>
<div className="carousel-body">
            <p className="orange carousel-title">Topic</p>
            <p className="carousel-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia maxime accusantium vel incidunt, laboriosam neque veniam tempora quae ea ipsum officiis soluta recusandae! Ullam nesciunt fugit sapiente animi eaque totam quam quod facere dolor dicta voluptatibus, dolorum excepturi, laboriosam sed illo, labore voluptates quo corporis assumenda officiis? Atque, quaerat doloribus?</p>
        </div>
<div className="carousel-body">
            <p className="orange carousel-title">Scale</p>
            <p className="carousel-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia maxime accusantium vel incidunt, laboriosam neque veniam tempora quae ea ipsum officiis soluta recusandae! Ullam nesciunt fugit sapiente animi eaque totam quam quod facere dolor dicta voluptatibus, dolorum excepturi, laboriosam sed illo, labore voluptates quo corporis assumenda officiis? Atque, quaerat doloribus?</p>
        </div>
</Carousel>
</div>
</section>
 */}
 <br />
 <br />
          <footer className="footer">
            <div className="upper-footer">
              <div className="contact" id="contact">
                <span className="orange">Contact</span>
                <a href="mailto: info@crypto528.com">info@crypto528.com</a>
                <div className="social-contact">
                  <a
                    href="https://www.facebook.com/Crypto528DAO/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={facebook} alt="facebook" className="social-icon" />
                  </a>
                  <a
                    href="https://twitter.com/crypto528dao?s=21"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={twitter} alt="twitter" className="social-icon" />
                  </a>
                  <a
                    href="https://www.linkedin.com/mwlite/company/crypto528dao"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={linkedin} alt="linkedin" className="social-icon" />
                  </a>
                  <a
                    href="https://instagram.com/crypto528dao?utm_medium=copy_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={instagramIcon}
                      alt="instagram"
                      className="social-icon" />
                  </a>
                  <a
                    href="https://www.reddit.com/user/Crypto528DAO/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={redditIcon} alt="reddit" className="social-icon" />
                  </a>
                  <a
                    href="https://medium.com/@Crypto528DAO"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={mediumIcon} alt="medium" className="social-icon" />
                  </a>
                  <a
                    href="http://tiktok.com/@crypto528dao"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={tiktokIcon} alt="tiktok" className="social-icon" />
                  </a>
                  <a
                    href="https://discord.gg/WYfAxsNz2h"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={discordIcon} alt="discord" className="social-icon" />
                  </a>
                </div>
              </div>
              <div className="about">
                <span className="orange">About</span>
                <a href="#home-content" onClick={scrollIntoView}>
                  Home
                </a>
                <a href="#our-team" onClick={scrollIntoView}>
                  About Us
                </a>
                <a href="#tokenomics" onClick={scrollIntoView}>
                  Tokenomics
                </a>
                <a href="#tokenomics" onClick={scrollIntoView}>
                  Purchase Agreement
                </a>
                <a href="#tokenomics" onClick={scrollIntoView}>
                  Blog 
                </a>
              </div>
              
              <div className="newsletter">
                <span className="orange">Newsletter</span>
                <p>Please enter your e-mail to receive our token updates.</p>
                <div className="subscribe">
                  <Tooltip
                    open={openFooterTooltip}
                    classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
                    TransitionComponent={Zoom}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={<>
                      <div className="tooltip-container"><img src={priorityIcon} alt="priority icon" /><p>{postFooterContent}</p></div>
                    </>}
                    placement="top-start" arrow
                  >
                    <input
                      type="text"
                      placeholder="Enter email for project updates"
                      value={footerInputValue}
                      onChange={e => {
                        setFooterEmail(e.target.value);
                        setFootertInputValue(e.target.value);
                      } } />
                  </Tooltip>
                  <button ref={footerSubmitRef} onClick={() => handleEmailCollector("footer")}>Subscribe</button>
                </div>
              </div>
            </div>
            <span className="copyright">© crypto528 Team</span>
          </footer>
          </h4>
          </section>
          }
          </section>
          </ParallaxProvider> 

  );
  {}
  }

