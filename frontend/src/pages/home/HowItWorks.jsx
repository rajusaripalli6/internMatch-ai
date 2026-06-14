export default function
HowItWorks() {

  const steps = [

    {
      number: "1",
      title: "Create Account",
      description:
        "Register as a student and build your profile."
    },

    {
      number: "2",
      title: "Upload Resume",
      description:
        "Upload your resume and extract your skills."
    },

    {
      number: "3",
      title: "Get AI Match Scores",
      description:
        "Discover internships that match your skills."
    },

    {
      number: "4",
      title: "Apply Easily",
      description:
        "Apply to internships with a single click."
    }

  ]

  return (

    <section className="
      py-20
      bg-white
    ">

      <div className="
        max-w-6xl
        mx-auto
        px-6
      ">

        <h2 className="
          text-4xl
          font-bold
          text-center
          mb-14
        ">

          How It Works

        </h2>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-8
        ">

          {steps.map(
            step => (

              <div

                key={step.number}

                className="
                  text-center
                  p-6
                "

              >

                <div className="
                  w-16
                  h-16
                  mx-auto
                  mb-4
                  rounded-full
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  text-2xl
                  font-bold
                ">

                  {step.number}

                </div>

                <h3 className="
                  text-xl
                  font-bold
                  mb-2
                ">

                  {step.title}

                </h3>

                <p className="
                  text-gray-600
                ">

                  {step.description}

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </section>

  )

}