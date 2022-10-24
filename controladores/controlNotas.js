import Persona from '../models/Personas';
import Usuario from '../models/Usuarios';
import {bcrypt} from 'bcryptjs';
import { check, validationResult} from ('express-validator')
import config from ('config')
import jwt from ('jsonwebtoken')