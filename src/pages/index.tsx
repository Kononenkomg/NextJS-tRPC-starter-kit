import { trpc } from "@/utils/trpc"
import { NextPage } from "next"
import styled from 'styled-components'
import Layout from "@/pages/_layout"

const Home: NextPage = () => {

  const { data: check } = trpc.check.useQuery()

  return (
    <Layout>
      <HelloWorldWrapper>
        <p>Hello World the status of up is {String(check?.ok)}</p>
      </HelloWorldWrapper>
    </Layout>
  )
}

export default Home

const HelloWorldWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
