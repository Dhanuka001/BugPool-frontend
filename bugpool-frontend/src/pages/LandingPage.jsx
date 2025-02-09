import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";

const LandingPage = () => {
  // Animation settings for floating boxes
  const boxVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  // Function to generate random colors
  const randomColor = () => {
    const colors = [
      "text-green-400",
      "text-pink-400",
      "text-purple-400",
      "text-blue-400",
      "text-yellow-400",
      "text-red-400",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="w-full bg-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center text-center relative z-10">
        <h2 className="text-5xl font-bold text-white">
          Just <span className="text-green-500">
            <Typewriter
              words={["share your bug"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h2>
        <p className="mt-4 text-gray-400">A social platform for programmers to debug together.</p>
      </div>

      {/* Floating Code Boxes */}
      <motion.div className="absolute top-1/4 left-10 p-4 border border-gray-500 text-xs rounded-lg shadow-lg" variants={boxVariants} animate="animate">
        <p className={randomColor()}>{"const bug = 'unexpected token';"}</p>
        <p className={randomColor()}>{"let error = true;"}</p>
        <p className={randomColor()}>{"function checkBug() {"}</p>
        <p className={randomColor()}>{"  if (error) {"}</p>
        <p className={randomColor()}>{"    console.log('error found!');"}</p>
        <p className={randomColor()}>{"  }"}</p>
        <p className={randomColor()}>{"  return 'debugging...';"}</p>
        <p className={randomColor()}>{"}"}</p>
        <p className={randomColor()}>{"let error = true;"}</p>
        <p className={randomColor()}>{"function checkBug() {"}</p>
        <p className={randomColor()}>{"  if (error) {"}</p>
        <p className={randomColor()}>{"    console.log('error found!');"}</p>
        <p className={randomColor()}>{"  }"}</p>
        <p className={randomColor()}>{"  return 'debugging...';"}</p>
        <p className={randomColor()}>{"}"}</p> <p className={randomColor()}>{"let error = true;"}</p>
        <p className={randomColor()}>{"function checkBug() {"}</p>
        <p className={randomColor()}>{"  if (error) {"}</p>
        <p className={randomColor()}>{"    console.log('error found!');"}</p>
        <p className={randomColor()}>{"  }"}</p>
        <p className={randomColor()}>{"  return 'debugging...';"}</p>
        <p className={randomColor()}>{"}"}</p>
      </motion.div>

      <motion.div className="absolute top-1/2 right-20 p-4 bg-gray-800 text-xs rounded-lg shadow-lg" variants={boxVariants} animate="animate">
        <p className={randomColor()}>{"function fixBug() {"}</p>
        <p className={randomColor()}>{"  let isFixed = false;"}</p>
        <p className={randomColor()}>{"  if(isFixed) {"}</p>
        <p className={randomColor()}>{"    return 'debugged';"}</p>
        <p className={randomColor()}>{"  }"}</p>
        <p className={randomColor()}>{"  return 'not fixed';"}</p>
        <p className={randomColor()}>{"}"}</p>
      </motion.div>

      <motion.div className="absolute bottom-1/4 left-80 p-4 border border-gray-500 text-xs rounded-lg shadow-lg" variants={boxVariants} animate="animate">
        <p className={randomColor()}>{"if(error) {"}</p>
        <p className={randomColor()}>{"  console.log('fix it!');"}</p>
        <p className={randomColor()}>{"}"}</p>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/2 p-4 bg-gray-800 text-xs rounded-lg shadow-lg"
        variants={boxVariants}
        animate="animate"
      >
        <p className={randomColor()}>{"function fixBug() {"}</p>
        <p className={randomColor()}>{"  let isFixed = false;"}</p>
        <p className={randomColor()}>{"  if(isFixed) {"}</p>
        <p className={randomColor()}>{"    return 'debugged';"}</p>
        <p className={randomColor()}>{"  }"}</p>
        <p className={randomColor()}>{"  return 'not fixed';"}</p>
        <p className={randomColor()}>{"}"}</p>
      </motion.div>
      <motion.div className="absolute top-1/4 right-40 p-4 border border-gray-500 text-xs rounded-lg shadow-lg" variants={boxVariants} animate="animate">
        <p className={randomColor()}>{"let debug = 'starting...';"}</p>
        <p className={randomColor()}>{"console.log(debug);"}</p>
        <p className={randomColor()}>{"let result = 'fixed';"}</p>
      </motion.div>

      <motion.div className="absolute bottom-2 left-10 p-4 border border-gray-500 text-xs rounded-lg shadow-lg" variants={boxVariants} animate="animate">
        <p className={randomColor()}>{"const action = 'debug';"}</p>
        <p className={randomColor()}>{"if(action === 'debug') {"}</p>
        <p className={randomColor()}>{"  console.log('debugging the bug');"}</p>
        <p className={randomColor()}>{"}"}</p>
      </motion.div>

      <motion.div className="absolute top-30 left-90 p-4 bg-gray-800 text-xs rounded-lg shadow-lg" variants={boxVariants} animate="animate">
        <p className={randomColor()}>{"let process = 'fixing bugs';"}</p>
        <p className={randomColor()}>{"if(process === 'fixing bugs') {"}</p>
        <p className={randomColor()}>{"  console.log('keep debugging');"}</p>
        <p className={randomColor()}>{"}"}</p>
      </motion.div>

      {/* How It Works Section */}
      <HowItWorks />
      <footer className="w-full bg-gray-800 text-center py-4 mt-10">
        <p className="text-gray-400">© 2025 BugPool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
