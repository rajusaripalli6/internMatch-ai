require("dotenv").config()
const jwt = require("jsonwebtoken")
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const User = require("./models/User")
const app = express()
const bcrypt = require("bcryptjs")
const authMiddleware =require("./middleware/authMiddleware")
const Application =require("./models/Application")
const Internship =require("./models/Internship")
const roleMiddleware =require("./middleware/roleMiddleware")
const multer =require("multer")
const pdfParse =require("pdf-parse")
const fs =require("fs")
connectDB()

app.use(cors())
app.use(express.json())
/*
=====================================
UPLOAD RESUME      
=====================================
*/
const storage =
  multer.diskStorage({

    destination:
      (req, file, cb) => {

        cb(
          null,
          "uploads/"
        )

      },

    filename:
      (req, file, cb) => {

        cb(

          null,

          Date.now() +
          "-" +
          file.originalname

        )

      }

  })

const upload =
  multer({
    storage
  })
  /*
=====================================
EXTRACT SKILLS FROM RESUME      
=====================================
*/
function extractSkills(
  text
) {

  const skillDatabase = [

    "React",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "Express",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "C",
    "C++",
    "SQL",
    "Git",
    "GitHub",
    "Bootstrap",
    "Tailwind",
    "REST API"

  ]

  const foundSkills =

    skillDatabase.filter(

      skill =>

        text
          .toLowerCase()
          .includes(
            skill.toLowerCase()
          )

    )

  return foundSkills

}
app.get("/", (req, res) => {

  res.json({
    message: "Backend running successfully",
  })

})

/*
=====================================
REGISTER
=====================================
*/

app.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body

    if (!name || !email || !password || !role) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })

    }

    /*
    CHECK EXISTING USER
    */

    const existingUser =
      await User.findOne({ email })

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      })

    }

    /*
    CREATE NEW USER
    */

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    })

    /*
    SAVE USER IN DATABASE
    */

    await newUser.save()
    const token = jwt.sign(

        {
          id: newUser._id,
          role: newUser.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }

      )

    /*
    SEND RESPONSE
    */

    return res.json({
      success: true,
      token,

      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })

  }

})

/*
=====================================
LOGIN
=====================================
*/

app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body

    /*
    CHECK USER EXISTS
    */

    const user =
      await User.findOne({ email })

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })

    }

    /*
    CHECK PASSWORD
    */

   const isMatch =
    await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })

    }
    const token = jwt.sign(

        {
          id: user._id,
          role: user.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }

      )

    /*
    LOGIN SUCCESS
    */

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })

  }

})
app.get(
  "/profile",

  authMiddleware,

  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).select("-password")

      return res.json({
        success: true,
        user,
      })

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Server error",
      })

    }

  }
)
app.post(

  "/internships",

  authMiddleware,

  roleMiddleware("recruiter"),

  async (req, res) => {

    try {

    const {
          title,
          company,
          location,
          skills,
          description,
        } = req.body

      const internship =
        new Internship({

          title,
          company,
          location,
          skills,
          description,

          recruiter:
            req.user.id,

        })

      await internship.save()

      return res.json({

        success: true,

        internship,

      })

    } catch (error) {

      console.log(error)

      return res.status(500).json({

        success: false,

        message: "Server error",

      })

    }

  }

)
app.get(

  "/internships",

  async (req, res) => {

    try {

      const internships =
        await Internship.find()

        .populate(
          "recruiter",
          "name email"
        )

        .sort({
          createdAt: -1,
        })

      return res.json({

        success: true,

        internships,

      })

    } catch (error) {

      console.log(error)

      return res.status(500).json({

        success: false,

        message: "Server error",

      })

    }

  }

)
app.get(

  "/my-internships",

  authMiddleware,

  roleMiddleware(
    "recruiter"
  ),

  async (
    req,
    res
  ) => {

    try {

      const internships =

        await Internship.find({

          recruiter:
            req.user.id

        })

        .sort({

          createdAt: -1

        })

      return res.json({

        success: true,

        internships

      })

    } catch (error) {

      console.log(
        error
      )

      return res.status(500)
        .json({

          success: false,

          message:
            "Server error"

        })

    }

  }

)
app.delete(

  "/internships/:id",

  authMiddleware,

  roleMiddleware(
    "recruiter"
  ),

  async (
    req,
    res
  ) => {

    try {

      const internship =

        await Internship.findOne({

          _id:
            req.params.id,

          recruiter:
            req.user.id

        })

      if (
        !internship
      ) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Internship not found"

          })

      }

      await internship.deleteOne()

      return res.json({

        success: true,

        message:
          "Internship deleted"

      })

    } catch (error) {

      console.log(
        error
      )

      return res.status(500)
        .json({

          success: false,

          message:
            "Server error"

        })

    }

  }

)
app.post(

  "/apply/:internshipId",

  authMiddleware,

  roleMiddleware("student"),

  async (req, res) => {

    try {

      const { internshipId } =
        req.params

      /*
      Prevent duplicate apply
      */

      const existingApplication =
        await Application.findOne({

          student: req.user.id,

          internship:
            internshipId,

        })

      if (existingApplication) {

        return res.status(400).json({

          success: false,

          message:
            "Already applied",

        })

      }

      /*
      Create application
      */

      const application =
        new Application({

          student:
            req.user.id,

          internship:
            internshipId,

        })

      await application.save()

      return res.json({

        success: true,

        application,

      })

    } catch (error) {

      console.log(error)

      return res.status(500).json({

        success: false,

        message: "Server error",

      })

    }

  }

)
app.put(

  "/internships/:id",

  authMiddleware,

  roleMiddleware(
    "recruiter"
  ),

  async (
    req,
    res
  ) => {

    try {

      const {

        title,
        company,
        location,
        skills,
        description

      } = req.body

      const internship =

        await Internship.findOne({

          _id:
            req.params.id,

          recruiter:
            req.user.id

        })

      if (
        !internship
      ) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Internship not found"

          })

      }

      internship.title =
        title

      internship.company =
        company

      internship.location =
        location

      internship.skills =
        skills

      internship.description =
        description

      await internship.save()

      return res.json({

        success: true,

        internship

      })

    } catch (error) {

      console.log(
        error
      )

      return res.status(500)
        .json({

          success: false,

          message:
            error.message

        })

    }

  }

)
app.get(

  "/my-applicants",

  authMiddleware,

  roleMiddleware("recruiter"),

  async (req, res) => {

    try {

      /*
      Find recruiter's internships
      */

      const internships =
        await Internship.find({

          recruiter:
            req.user.id,

        })

      /*
      Extract internship IDs
      */

      const internshipIds =
        internships.map(
          (internship) =>
            internship._id
        )

      /*
      Find applications
      */

      const applications =
        await Application.find({

          internship: {
            $in: internshipIds,
          }

        })

        .populate(
          "student",
          "name email"
        )

        .populate(
          "internship",
          "title company"
        )

      return res.json({

        success: true,

        applications,

      })

    } catch (error) {

      console.log(error)

      return res.status(500).json({

        success: false,

        message: "Server error",

      })

    }

  }

)
app.patch(

  "/applications/:applicationId",

  authMiddleware,

  roleMiddleware("recruiter"),

  async (req, res) => {

    try {

      const { applicationId } =
        req.params

      const { status } =
        req.body

      /*
      Find application
      */

      const application =
        await Application.findById(
          applicationId
        )

        .populate({
          path: "internship",

          populate: {
            path: "recruiter",
          },

        })

      if (!application) {

        return res.status(404).json({

          success: false,

          message:
            "Application not found",

        })

      }

      /*
      Ownership check
      */

      if (

        application.internship
          .recruiter._id.toString()

        !== req.user.id

      ) {

        return res.status(403).json({

          success: false,

          message:
            "Access denied",

        })

      }

      /*
      Update status
      */

      application.status =
        status

      await application.save()

      return res.json({

        success: true,

        application,

      })

    } catch (error) {

      console.log(error)

      return res.status(500).json({

        success: false,

        message: "Server error",

      })

    }

  }

)
app.get(

  "/my-applications",

  authMiddleware,

  roleMiddleware("student"),

  async (req, res) => {

    try {

      const applications =
        await Application.find({

          student:
            req.user.id,

        })

        .populate({

          path: "internship",

          select:
            "title company location",

        })

        .sort({

          createdAt: -1,

        })

      return res.json({

        success: true,

        applications,

      })

    } catch (error) {

      console.log(error)

      return res.status(500).json({

        success: false,

        message: "Server error",

      })

    }

  }

)
app.put(

  "/update-skills",

  authMiddleware,

  async (req, res) => {

    try {

      const { skills } =
        req.body

      const user =
        await User.findById(
          req.user.id
        )

      user.skills =
        skills

      await user.save()

      return res.json({

        success: true,

        user,

      })

    } catch (error) {

      console.log(error)

      return res.status(500).json({

        success: false,

        message:
          "Server error",

      })

    }

  }

)
app.get(

  "/match-score/:internshipId",

  authMiddleware,

  async (req, res) => {

    try {

      const internship =
        await Internship.findById(
          req.params.internshipId
        )

      if (!internship) {

        return res.status(404)
          .json({
            success: false,
            message:
              "Internship not found",
          })

      }

      const user =
        await User.findById(
          req.user.id
        )

      const userSkills =
        user.skills.map(
          skill =>
            skill.toLowerCase()
        )

      const matchedSkills =

        internship.skills.filter(
          skill =>

            userSkills.includes(
              skill.toLowerCase()
            )

        )

      const score =

        Math.round(

          (
            matchedSkills.length /

            internship.skills.length

          ) * 100

        )

      return res.json({

        success: true,

        score,

        matchedSkills,

        missingSkills:

          internship.skills.filter(
            skill =>

              !userSkills.includes(
                skill.toLowerCase()
              )

          )

      })

    } catch (error) {

      console.log(error)

      return res.status(500)
        .json({

          success: false,

          message:
            "Server error",

        })

    }

  }

)
/*
=====================================
Resume Upload API
=====================================
*/ 
app.post(

  "/upload-resume",

  authMiddleware,

  upload.single(
    "resume"
  ),

  async (
    req,
    res
  ) => {

    try {

      const dataBuffer =
        fs.readFileSync(
          req.file.path
        )

      const pdfData =
        await pdfParse(
          dataBuffer
        )

      const extractedSkills =

        extractSkills(
          pdfData.text
        )

      const user =

        await User.findById(
          req.user.id
        )

      user.resume =
        req.file.path

      user.skills =
        extractedSkills

      await user.save()

      return res.json({

        success: true,

        skills:
          extractedSkills

      })

    }catch (error) {

  console.log(
    "========== UPLOAD ERROR =========="
  )

  console.log(error)

  return res.status(500)
    .json({

      success: false,

      message:
        error.message

    })

}

  }

)
app.get(

  "/profile",

  authMiddleware,

  async (
    req,
    res
  ) => {

    try {

      const user =

        await User.findById(
          req.user.id
        )

      return res.json({

        success: true,

        user

      })

    } catch (error) {

      return res.status(500)
        .json({

          success: false,

          message:
            "Server error"

        })

    }

  }

)
app.listen(process.env.PORT, () => {

  console.log(
    `Server running on port ${process.env.PORT}`
  )

})