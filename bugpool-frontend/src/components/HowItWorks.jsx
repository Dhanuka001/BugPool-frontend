const HowItWorks = () => {
    return (
      <div className="w-full py-16 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-bold text-green-500">{"{ How It Works }"}</h2>
        <p className="text-gray-400 mt-4">Debugging together made simple!</p>
  
        {/* Steps Container */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8">
          
          {/* Step 1 */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-72 text-center hover:scale-105 transition">
            <p className="text-purple-400 text-2xl font-bold">1️⃣ Post Your Bug</p>
            <p className="text-gray-400 mt-2">Describe your issue & get instant help.</p>
          </div>
  
          {/* Step 2 */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-72 text-center hover:scale-105 transition">
            <p className="text-blue-400 text-2xl font-bold">2️⃣ Get Solutions</p>
            <p className="text-gray-400 mt-2">Other devs suggest fixes & debugging tips.</p>
          </div>
  
          {/* Step 3 */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-72 text-center hover:scale-105 transition">
            <p className="text-green-400 text-2xl font-bold">3️⃣ Debug & Share</p>
            <p className="text-gray-400 mt-2">Fix the issue & help others too!</p>
          </div>
  
        </div>
      </div>
    );
  };
  
  export default HowItWorks;
  