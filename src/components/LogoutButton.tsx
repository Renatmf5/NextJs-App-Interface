'use client';

import { signOut } from 'next-auth/react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full 
              text-muted-foreground transition-colors hover:text-foreground'
            onClick={() => signOut()}
          >
            <LogOut className='h-5 w-5 shrink-0 text-red-600' />
            <span className='sr-only'>Sair</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Sair</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}