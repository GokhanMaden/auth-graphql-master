const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        // resolve(parentValue, args, request) {
        // AuthService.signup({ email : args.email, password: args.password, req: requset})
        // Bunu yapmak yerine ES06 kullanarak args değişkenin karşılığı olarak 
        // direkt olarak içindeki değişkenleri kullanacağız. Alttaki satırı ilk satır ile karşılaştırabilirsin.
        return AuthService.signup({ email, password, req})
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    // Bu kısımda password.js'den yararlanıldı.
    //Önce user objesini kaydediyor ve sonra logout oluyor. Bu işlemlerden sonra 
    // user'ı siliyor.
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req})
      }
    }
  }
});

module.exports = mutation;