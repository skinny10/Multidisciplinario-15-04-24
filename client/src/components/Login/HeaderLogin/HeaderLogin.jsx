import Logo from '../../../assets/Img//Logo.png'

 function HeaderLogin(){
    
    return(
        <>
        
        <header>
<nav class="bg-gray-700 ">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-14 items-center justify-between">
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
          <img class="h-8 w-auto" src={Logo} alt="Your Company"/>
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
           
            <a  class=" text-white rounded-md px-3 py-2 text-xl font-medium" aria-current="page">HomeSchool</a>
   
          </div>
        </div>
      </div>
     
    </div>
  </div>

  <div class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <a  class=" text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">HomeSchool</a>
    </div>
  </div>
</nav>
 </header>
        </>
    )
}

export default HeaderLogin