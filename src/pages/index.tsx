import { trpc } from "@/utils/trpc"
import { NextPage } from "next"
import styled from 'styled-components'

const Home: NextPage = () => {

  const { data: check } = trpc.check.useQuery()

  console.log(check)

  return (
    <HelloWorldWrapper>
      <p>Hello World</p>
      {/* <p>{check?.ok}</p> */}
    </HelloWorldWrapper>
  )
}

export default Home

const HelloWorldWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
