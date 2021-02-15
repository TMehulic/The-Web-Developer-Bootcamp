const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw,salt);
    // moze i : bcrypt.hash(pw,12);
    console.log(salt);
    console.log(hash);
}

const login = async(pw, hashedPw) => {
    const result = bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("LOGGED YOU IN SUCCESSFULLY");
    } else {
        console.log("incorrect!");
    }
}

//hashPassword('monkey');
login('monkey','$2b$12$aVGL7/v5.8p3dDjA6rg6oODT5znAHNdAf3c14LC5djrRqcRJvsOXm');