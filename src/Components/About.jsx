import React from "react";

function About() {
  return (
    <div className="bg-[#fbeeee] py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-[56px] mb-4">About Us</h1>
        <h3 className="text-[18px]">Learn more about MovieMind AI</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 lg:gap-16">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-60 h-60 max-w-sm text-center">
          <h3 className="text-lg mb-5 mt-6 text-[#5C1919]">
            Innovative Movie Recommendations
          </h3>
          <p className="text-sm text-black">
            Utilizing Cosine Similarities to suggest movies that match personal
            preferences.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-6 w-60 h-60 lg:mt-12 max-w-sm text-center">
          <h3 className="text-lg mb-5 mt-6 text-[#5C1919]">
            Accuracy & Personalization
          </h3>
          <p className="text-sm text-black">
            Analyzing viewer data to provide precise recommendations for a
            tailored movie experience.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-6 w-60 h-60 max-w-sm text-center">
          <h3 className="text-lg mb-5 mt-6 text-[#5C1919]">
            Simple & Interactive
          </h3>
          <p className="text-sm text-black">
            Offering a user-friendly interface for quick movie searches and
            relevant recommendations.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-16 px-4 mt-20">
        <div className="flex items-center  mb-3">
          <img src="play.svg" className="w-16" alt="Play icon" />
          <h1 className="text-[56px] text-shadow-lg">MovieMind</h1>
        </div>
        <h3 className="text-[18px] mt-2 text-shadow-lg">
          The Best Movie Recommendation
        </h3>
      </div>
    </div>
  );
}

export default About;
