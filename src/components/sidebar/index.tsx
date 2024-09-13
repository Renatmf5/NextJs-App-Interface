import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Home, Package, PanelBottom, Settings2, ShoppingBag, Users } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import LogoutButton from '../LogoutButton'

export function Sidebar() {
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside
        className='fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex sm:flex-col'
      >
        <nav className='flex flex-col items-center gap-4 px-2 py-5'>
          <TooltipProvider>
            <Link
              href="#"
              className='flex h-9 w-9 shrink-0 items-center justify-center bg-primary
               text-primary-foreground rounded-full'
            >
              <Package className='h-4 w-4' />
              <span className='sr-only'>Project Avatar</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                   text-muted-foreground transition-colors hover:text-foreground'
                >
                  <Home className='h-5 w-5' />
                  <span className='sr-only'>Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/extrair"
                  className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                   text-muted-foreground transition-colors hover:text-foreground'
                >
                  <ShoppingBag className='h-5 w-5' />
                  <span className='sr-only'>Extrações</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Extrações</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dados"
                  className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                   text-muted-foreground transition-colors hover:text-foreground'
                >
                  <Package className='h-5 w-5' />
                  <span className='sr-only'>Dados</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dados</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/analises"
                  className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                   text-muted-foreground transition-colors hover:text-foreground'
                >
                  <Users className='h-5 w-5' />
                  <span className='sr-only'>Analises ML/IA</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analises ML/IA</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/apidocs"
                  className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                   text-muted-foreground transition-colors hover:text-foreground'
                >
                  <Settings2 className='h-5 w-5' />
                  <span className='sr-only'>Api Docs</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Api Docs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-5'>
          <LogoutButton />
        </nav>

      </aside>
      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className='sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className='sm:hidden'>
                <PanelBottom className='w-5 h-5' />
                <span className='sr-only'>Abrir / fechar menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className='sm:max-w-x'>
              <nav className='grid gap-6 text-lg font-medium'>
                <Link href="#"
                  className='flex h-10 w-10 bg-primary rounded-full text-lg 
                  items-center justify-center text-primary-foreground md:text-base 
                  gap-2'
                  prefetch={false}
                >
                  <Package className='w-5 h-5 transition-all' />
                  <span className='sr-only'>Logo do projeto</span>
                </Link>
                <Link href="#"
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                  prefetch={false}
                >
                  <Home className='w-5 h-5 transition-all' />
                  Inicio
                </Link>
                <Link href="/extrair"
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                  prefetch={false}
                >
                  <ShoppingBag className='w-5 h-5 transition-all' />
                  Extrações
                </Link>
                <Link href="/dados"
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                  prefetch={false}
                >
                  <Package className='w-5 h-5 transition-all' />
                  Dados
                </Link>
                <Link href="/analises"
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                  prefetch={false}
                >
                  <Users className='w-5 h-5 transition-all' />
                  Analises ML/IA
                </Link>
                <Link href="/apidocs"
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                  prefetch={false}
                >
                  <Settings2 className='w-5 h-5 transition-all' />
                  Api Docs
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <h2>Menu</h2>
        </header>
      </div>
    </div>
  )
}