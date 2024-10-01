#include "protheus.ch"

User Function menuSuprimentos()

    FwCallApp("suprimentos")

Return 

User Function suprimentos()

   RpcClearenv()
   RPCSetType(3)
   RpcSetEnv('02')
    u_menuSuprimentos()

Return
