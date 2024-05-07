import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
<footer class="bg-basico text-gray-300 body-font w-full z-50">
  <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
    <img src="assets/images/logo-snobs.png" alt="Logo" class="h-14 object-contain" />
      <span class="ml-3 text-xl">SNOBS</span>
    </a>
    <p class="text-sm sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">© 2024 Carlos Dalmau —
      <a href="#" class="text-gray-300 ml-1" rel="noopener noreferrer" target="_blank">Legal</a>
    </p>
    <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <a href="#" class="text-gray-300">
        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.54v-5.04h-2v5.04H7.5v-7.54h2V11c0-1.13.56-2.82 2.82-2.82l2.12.01v1.97c-.38-.06-.75-.09-1.13-.09-1.19 0-2.25.69-2.25 2.19v1.54h3.63l-.5 3.63h-3.13V18.54h-.01z" />
        </svg>
      </a>
      <a href="#" class="ml-3 text-gray-300">
        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M13 2H6a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2h7l5 5V7a2 2 0 0 0-2-2zm5.37 2L15 11.36 13 9.43 11 11.36 8.63 9H13V4.63c0-.29.08-.56.22-.8zm.5 2.47l2.75 2.75-2.75 2.75V6.47z" />
        </svg>
      </a>
      <a href="#" class="ml-3 text-gray-300">
        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.25 15.25h-8.5v-2.67c0-1.41.95-2.6 2.25-2.94v-.56c0-2.34 1.49-4.33 3.57-5.07-1.32-.46-2.22-1.71-2.22-3.13 0-1.79 1.45-3.25 3.25-3.25s3.25 1.46 3.25 3.25c0 1.42-.9 2.67-2.22 3.13 2.08.74 3.57 2.73 3.57 5.07v.56c1.3.34 2.25 1.53 2.25 2.94v2.67z" />
        </svg>
      </a>
    </span>
  </div>
</footer>


  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
