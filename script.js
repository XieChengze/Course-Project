//carousel-----------------------------------------------------
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const carousel = document.querySelector(".carousel");

let currentSlide = 0;
const totalSlides = slides.length;
let autoPlayInterval;
let isAutoPlaying = true;
const autoSlideInterval= 5000;

function ButtonShowSlide(index){
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

}

function showSlide(index){
    slides.forEach(slide => slide.classList.remove("active"));
    currentSlide = index;
    slides[currentSlide].classList.add("active");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
}

function nextSlide(){
    let newIndex = (currentSlide+1)%totalSlides;
    showSlide(newIndex);
}

function prevSlide(){
    let newIndex = currentSlide-1;
    if(newIndex<0){
        newIndex = totalSlides-1;
    }
    showSlide(newIndex);
}

function startAutoPlay(){
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, autoSlideInterval);
    isAutoPlaying = true;
}

function stopAutoPlay(){
    if(autoPlayInterval){
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
    isAutoPlaying = false;
}

function resetAutoPlay(){
    if(isAutoPlaying){
        stopAutoPlay();
        startAutoPlay();
    }
}

function initializeCarousel(){
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    if (!prevButton || !nextButton || totalSlides === 0) {
        return;
    }

    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", function(){
        nextSlide();
        resetAutoPlay();
    });

    if(carousel){
        carousel.addEventListener("mouseenter", stopAutoPlay);
        carousel.addEventListener("mouseleave", startAutoPlay);
    }
    showSlide(0);
    startAutoPlay();
}

initializeCarousel();

for(let i = 0; i < dots.length; i++){
    dots[i].addEventListener("click", ()=> {
        ButtonShowSlide(i);
    });
}


// Form------------------------------------------------------------
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    let isValid = true;
    const name = document.getElementById("name").value.trim();
    if (name === "") {
        document.getElementById("nameError").textContent = "Name required.";
        isValid = false;
        }
    
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email.";
        isValid = false;
        }
    const dob = document.getElementById("dob").value;
    if (!dob) {
        document.getElementById("dobError").textContent = "Select your birth date.";
        isValid = false;
        }
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
        document.getElementById("genderError").textContent = "Please select your gender.";
        isValid = false;
        }
    const favGame = document.getElementById("favGame").value;
    if (favGame === "") {
        document.getElementById("favGameError").textContent = "Choose your favourite period.";
        isValid = false;
        }
    const comment = document.getElementById("comments").value.trim();
    if (comment === "") {
        document.getElementById("commentError").textContent = "Reason needed.";
        isValid = false;
        }
    
    if (isValid) {
        alert("Form submitted successfully!");
        location.reload();
    }
})

//burger menu------------------------------------------------------------------

const burgerMenu = document.getElementById("burger-menu");
const navigation = document.querySelector(".navigation");
burgerMenu.addEventListener("click", ()=>{
    navigation.classList.toggle("show");
});

navigation.querySelectorAll("a").forEach(link =>{
    link.addEventListener("click",()=>{
        navigation.classList.remove("show");
    })
})

//modal--------------------------------------------------------------------
const modal = document.getElementById("gameModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalVideo = document.getElementById("modalVideo");   
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.querySelector(".close-modal");

const imageContainers = document.querySelectorAll(".image-container");

imageContainers.forEach(container => {
    container.addEventListener("click", function() {
        const title = this.getAttribute("data-title");
        const description = this.getAttribute("data-description");
        const videoSrc = this.getAttribute("data-video");
        const imgSrc = this.querySelector("img").getAttribute("src");
        
        modalTitle.textContent = title;

        if(videoSrc){
            modalVideo.src=videoSrc;
            modalVideo.style.display = "block";
            modalImage.style.display = "none";
        }else{
            modalImage.src = imgSrc;
            modalImage.alt = title;
            modalImage.style.display = "block";
            modalVideo.style.display = "none";
        }
        
        modalDescription.textContent = description;
        
        modal.style.display = "flex";
    });
});



closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    if(modalVideo){
        modalVideo.pause()
    }
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        if(modalVideo){
            modalVideo.pause()
        }
    }
});




// login register------------------------------------------------------------
const registerBtnNav = document.getElementById("registerBtnNav");
const loginBtnNav = document.getElementById("loginBtnNav");
const registrationModal = document.getElementById("registrationModal");
const loginModal = document.getElementById("loginModal");
const regName = document.getElementById("regName");
const regUsername = document.getElementById("regUsername");
const regPassword = document.getElementById("regPassword");
const registerBtn = document.getElementById("registerBtn");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");

const shopping = document.getElementById("shopping");
const memberContent = document.getElementById("memberContent");
const noneMemberContent = document.getElementById("noneMemberContent");


function showModal(modal) {
    modal.style.display = "flex";
}

function hideModal(modal) {
    modal.style.display = "none";
}


registerBtnNav.addEventListener("click", () => {
    showModal(registrationModal);
});

loginBtnNav.addEventListener("click", () => {
    showModal(loginModal);
});


registerBtn.addEventListener("click", () => {
    const name = regName.value.trim();
    const username = regUsername.value.trim();
    const password = regPassword.value.trim();
    
    if (name === "" || username === "" || password === "") {
        showMessageModal("Please fill in all registration fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        showMessageModal("Username already exists. Please choose another one.");
        regName.value = "";
        regUsername.value = "";
        regPassword.value = "";
        return;
    }

    const newUser = {
        name: name,
        username: username,
        password: password
    };
    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    showMessageModal("Registration successful!");
    
    regName.value = "";
    regUsername.value = "";
    regPassword.value = "";

    hideModal(registrationModal);
    showModal(loginModal);
});

loginBtn.addEventListener("click", () => {
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();
    
    if (username === "" || password === "") {
        showMessageModal("Please enter both username and password.");
        return;
    }
    

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        const existingUser = users.find(u => u.username === username);
        
        if (!existingUser) {
            showMessageModal("No account found with this username.");
            loginUsername.value="";
            loginPassword.value="";
            if (shouldRegister) {
                hideModal(loginModal);
                showModal(registrationModal);
            }
        } else {

            const choice = confirm("Incorrect password. Click OK to go to registration or Cancel to clear inputs and try again.");
            if (choice) {
                showModal(loginModal);
                loginUsername.value = "";
                loginPassword.value = "";
            } else {
                loginUsername.value = "";
                loginPassword.value = "";
                loginUsername.focus();
            }
        }
        return;
    }
    

    showMessageModal(`Welcome, ${user.name}! Login successful.`);
    
    localStorage.setItem("loggedInUser",user.name);

    loginUsername.value = "";
    loginPassword.value = "";
    

    hideModal(loginModal);
    

    updateNavigationAfterLogin(user.name);
    memberContent.classList.remove("hidden");
    noneMemberContent.classList.add("hidden");

});


window.addEventListener("click", (event) => {
    if (event.target === registrationModal) {
        hideModal(registrationModal);
    }
    if (event.target === loginModal) {
        hideModal(loginModal);
    }
});


function updateNavigationAfterLogin(userName) {
    const loginDiv = document.querySelector(".login");
    loginDiv.innerHTML = `
        <span style="color: white; margin-right: 10px;">Welcome, ${userName}!</span>
        <button id="logoutBtn">Logout</button>
    `;
    
    document.getElementById("logoutBtn").addEventListener("click", () => {

        localStorage.removeItem("loggedInUser");

        showMessageModal("You have been logged out.");
        location.reload(); 
    });
}


function checkLoginState() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        updateNavigationAfterLogin(loggedInUser);

        const memberContent = document.getElementById("memberContent");
        if(memberContent){
            memberContent.classList.remove("hidden");
            noneMemberContent.classList.add("hidden");
        }
    }
}


function showMessageModal(title, message) {
    const messageModal = document.getElementById("messageModal");
    const messageTitle = document.getElementById("messageTitle");
    const messageText = document.getElementById("messageText");
    
    messageTitle.textContent = title;
    messageText.textContent = message;
    messageModal.style.display = "flex";
}


function hideMessageModal() {
    document.getElementById("messageModal").style.display = "none";
}



document.querySelector(".message-close-modal").addEventListener("click", hideMessageModal);
document.getElementById("messageOkBtn").addEventListener("click", hideMessageModal);


window.addEventListener("click", (event) => {
    const messageModal = document.getElementById("messageModal");
    if (event.target === messageModal) {
        hideMessageModal();
    }
});









































checkLoginState();



    Vue.createApp({
        data() {
            return {

            genre:['Action', 'Adventure', 'RPG', 'Strategy', 
            'Simulation', 'Sports', 'Racing', 'Puzzle',
            'Horror', 'Sci-Fi', 'Fantasy', 'Open World',
            'Multiplayer', 'Single Player', 'Story Rich'],

            selectedGenre:[],
            loading:false,
            result:null,
            noResult:false,

    games:[
        
  {
    name: 'Miside',
    genre: ['Horror', 'Sci-Fi', 'Single Player'],
    image: 'assets/Miside.webp',
    description: 'Miside is a horror-themed puzzle escape game, with a thrilling plot and an unforgettable ending..'
  },
  {
    name: 'DOOM Eternal',
    genre: ['Action', 'Shooter', 'Single Player'],
    image: 'assets/DOOM_Eternal.webp',
    description: 'Fast-paced demon-slaying FPS that rewards aggressive combat and fluid movement.'
  },
  {
    name: 'Mortal Kombat 11',
    genre: ['Fighting', 'Action', 'Multiplayer'],
    image: 'assets/Mortal_Kombat_11.webp',
    description: 'Legendary fighting game with brutal fatalities, deep kombos, and cinematic story.'
  },
  {
    name: 'Phasmophobia',
    genre: ['Horror', 'Multiplayer', 'Adventure'],
    image: 'assets/Phasmophobia.webp',
    description: 'Co-op ghost hunting where you and your team investigate paranormal activity.'
  },
  {
    name: 'Darkest Dungeon',
    genre: ['Horror', 'Fantasy', 'RPG'],
    image: 'assets/Darkest_Dungeon.webp',
    description: 'A gothic roguelike RPG where stress and insanity are as deadly as monsters.'
  },
  {
    name: 'Dota 2',
    genre: ['Action', 'Strategy', 'Multiplayer'],
    image: 'assets/Dota_2.webp',
    description: 'The ultimate competitive MOBA with deep strategy and team-based action.'
  },
  {
    name: 'The Witcher 3: Wild Hunt',
    genre: ['RPG', 'Open World', 'Story Rich'],
    image: 'assets/The_Witcher_3_Wild_Hunt.webp',
    description: 'A sprawling open-world RPG filled with morally complex quests and rich storytelling.'
  },
  {
    name: 'Football Manager 2024',
    genre: ['Simulation', 'Sports', 'Multiplayer'],
    image: 'assets/Football_Manager_2024.webp',
    description: 'The most authentic football management simulation where every decision matters.'
  },
  {
    name: 'Forza Horizon 5',
    genre: ['Racing', 'Open World', 'Single Player'],
    image: 'assets/Forza_Horizon_5.webp',
    description: 'An exhilarating open-world racing game set in a vibrant and diverse Mexico.'
  },
  {
    name: 'Portal 2',
    genre: ['Puzzle', 'Adventure', 'Story Rich'],
    image: 'assets/Portal_2.webp',
    description: 'A witty and mind-bending puzzle game that redefines first-person platforming.'
  }

            ],

            }
        },
        methods: {
            findGame(){
                this.loading=true;
                
                this.result=null;
                this.noResult=false;

                let bestMatch = null;
                let highestScore = 0;

                setTimeout(() => {
                for (const game of this.games){
                    const matchCount = game.genre.filter(g => this.selectedGenre.includes(g)).length;
                    if(matchCount > highestScore){
                        bestMatch = game;
                        highestScore = matchCount;
                    }
                }

                if(bestMatch && highestScore > 0){
                    this.result = bestMatch;
                }else{
                    this.noResult = true;
                }
                this.loading = false    
                }, 300);

                
            },

            clearAll(){
                this.selectedGenre = [];
                this.result = null;
                this.noResult = false;
                }
        }
    }).mount("#app");
