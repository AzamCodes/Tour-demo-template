gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    CircleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#circle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function CircleMouseFollower() {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#circle"
    ).style.transform = `translate(${dets.clientX}.px,${dets.clientY}.px)`;
  });
}

circleChaptaKaro();
CircleMouseFollower();

// GSAP

var t1 = gsap.timeline();

function time() {
  var a = 0;
  setInterval(function () {
    a += Math.floor(Math.random() * 20);
    if (a < 100) {
      document.querySelector(".loader h1").innerHTML = a + "%";
    } else {
      a = 100;

      document.querySelector(".loader h1").innerHTML = a + "%";
    }
  }, 160);
}

t1.to(".loader h1", {
  scale: 1.5,
  delay: 0.5,
  duration: 1,
  onStart: time,
});

t1.to(".loader", {
  top: "-100vh",
  delay: 0.5,
  duration: 1.5,
})
  .from("nav", {
    scale: 0,
    y: 50,
    delay: 0.4,
  })
  .from("nav .logo, nav ul li a", {
    y: -80,
    opacity: 0,
    stagger: 0.3,
    duration: 0.8,
  })
  .to(".boundingelem", {
    y: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInOut,
    stagger: 0.3,
    scrub: 3,
  })
  .from(".right img", {
    scale: 2,
    duration: 0.4,
    opacity: 0,
  })
  .from(".swipe", {
    y: 40,
    repeat: -1,
    duration: 1,
    delay: 0.4,
  })
  .from(".page-2 h2", {
    y: -40,

    opacity: 0,
    scrollTrigger: {
      trigger: ".page-2 h2",
      scroller: ".main",
      start: "top 80%",
    },
  })
  .from(".page-2 .bx", {
    opacity: 0,
    scale: 0,
    duration: 0.3,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".page-2 .bx",
      scroller: ".main",
      start: "top 70%",
      scrub: 2,
    },
  })
  .to(".page-3 h1", {
    transform: "translateX(-100%)",
    fontWeight: "100",
    color: "#c4f403",
    scrollTrigger: {
      trigger: ".page-3",
      scroller: ".main",
      start: "top 0",
      end: "top -200%",
      scrub: 3,
      pin: true,
    },
  });

// JAvaScript

let menu = document.querySelector("#menu");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  // header.classList.toggle("sticky", window.scrollY > 100);
  menu.classList.remove("bx-x");
  navbar.classList.remove("open");
});
menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};

let year = document.querySelector(".currentyear");

year.innerHTML = new Date().getFullYear();
const date = document.querySelector(".time");
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

date.innerHTML = formatAMPM(new Date());
