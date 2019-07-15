import { GraphQLScalarType, Kind } from 'graphql'

const GeoPoint = new GraphQLScalarType({
  name: 'GeoPoint',
  description: 'GeoJSON Point - Coordinates',
  parseValue(value) {
    return value
  },
  serialize(value) {
    return value
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.FLOAT || ast.kind === Kind.INT) {
      return parseFloat(ast.value) // value from the client query
    }
    return null
  }
})

export default GeoPoint
