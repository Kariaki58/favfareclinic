import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Image src="/dental_logo.png" alt="Favfare" width={100} height={58} className="text-primary" />
    </div>
  );
}